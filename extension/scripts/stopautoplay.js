

(function (window) {
	'use strict'


	var document = window.document,
		extended = false;

	/**
Когда вкладка была открыта в качестве закладки фона в первый раз, 
видео загружается, когда вкладка получает фокус (встроенная функция Chrome)	 
* @type 	{boolean}
	 */
	var focusStop = !extended,
		seeked = false;

	/**
	 * Остановка плеера, когда пользователь не искал, 
	 вкладка не имеет фокуса, цикл отключен, 
	 и это не страница списка воспроизведения.
	 */
	function stopAutoplay(player) {
		console.log('stopAutoplay',
			!player.loop, 
			document.location.search.indexOf('list=') === -1, 
			!document.hasFocus(), 
			focusStop, 
			player)

		if (seeked) {
			console.log('stopAutoplay seeked')
			seeked = false
			return false
		}

		// Мы не хотим останавливать просмотр видео или плейлистов
		// Видео в фоновом режиме - или это не расширенное (= мы всегда должны останавливаться)?
		if (!player.loop 
			&& document.location.search.indexOf('list=') === -1 
			&& !document.hasFocus() || focusStop) {  
			focusStop = extended ? false : true;
			_pause(player);
			return true;
		}

		return false;
	}

	
	 // Выдает команду pause на элемент плеера.
	function _pause(player) {
		console.log('pause', player);
		if (player.pause)
			return player.pause();
		player.pauseVideo();
	}

	 // Выдает команду воспроизведения в элементе проигрывателя.
	function _play(player) {
		console.log('play', player);
		if (player.play)
			return player.play();
		player.playVideo();
	}

	 // Обработчик событий, когда вкладка становится видимой (??? зачем запускать плеер?)
	function handleVisibilityChange(player) {
		console.log('handleVisibilityChange', player, player.readyState);
		window.setTimeout(function () {
			if (!document.hidden)
				_play(player);
		}, 60);
	}

	 // Добавляет слушателей для целей отладки.
	function addDebugListener(player) {
		player.addEventListener('canplay', function () {
			console.log('canplay');
		});
		player.addEventListener('canplaythrough', function () {
			console.log('canplaythrough');
		});
		player.addEventListener('durationchange', function () {
			console.log('durationchange');
		});
		player.addEventListener('loadeddata', function () {
			console.log('loadeddata');
		});
		player.addEventListener('loadedmetadata', function () {
			console.log('loadedmetadata');
		});
		player.addEventListener('loadstart', function () {
			console.log('loadstart');
		});
		player.addEventListener('playing', function () {
			console.log('playing');
		});
		player.addEventListener('play', function () {
			console.log(player.readyState, player.networkState);
			console.log('play');
		});
		player.addEventListener('waiting', function () {
			console.log('waiting');
		});
		player.addEventListener('stalled', function () {
			// console.log('stalled');
		});
		player.addEventListener('seeking', function () {
			console.log('seeking');
		});
		player.addEventListener('seeked', function () { 
		// Поиск пользователя вперед / назад
			console.log('seeked');
		});
		player.addEventListener('timeupdate', function () {
			// console.log('timeupdate');
		});
		window.addEventListener('focus', function () { 
		// Рассказывает мне временную метку, которую я сфокусировал
			console.info('now');
		});
	}

	 // Привязывает определенные события плееру.
	function bindPlayer(player) {
		console.info('binding', player);

		// Не приостанавливать если не идет проигрывание
		console.log(player.readyState, player.networkState)
		if (player.readyState > 1) {
			stopAutoplay(player);
		}

		console.info('add debug', addDebugListener.apply(null, [player]));

		// Функция главного останова если Видео готово к воспроизведению.
		player.addEventListener('canplaythrough', stopAutoplay.bind(null, player));

		// Останавливает просмотр -> ожидание навигации
		var i = 0;
		player.addEventListener('playing', function playing() {
			console.log('stop on playing event');

			stopAutoplay(player);
			if (++i === 2)
				player.removeEventListener('playing', playing);
		});

		player.addEventListener('loadeddata', function () {
			console.log('loadeddata -> reset counter')

			i = 0 // сброс -> ожидание навигации
		})

		// Обработчик для расширенной версии
		if (extended)
			window.addEventListener('focus', handleVisibilityChange.bind(null, player));
		else { 
			// Non-Extended не должен останавливаться при поиске 
			// Нажмите кнопку воспроизведения в первый раз */
			player.addEventListener('seeked', function() { 
				seeked = true 
			});
			player.addEventListener('play', function() { 
				if (player.readyState > 1) seeked = true; 
			});
		}
	}

	 // Конструктор связывает и инициализирует переменные
	function StopAutoplay() {
		this.waitForPlayer();
		this.bindGeneral();
	}

	var proto = StopAutoplay.prototype;

	 // * Устанавливает наблюдателя, который ждет видео элементов.
	 // * @return  	{Object}   	player 		Player DOM Node
	proto.waitForPlayer = function () {
		var observer = new MutationObserver(function (mutations) {
			for (var i = 0; i < mutations.length; i++) {
				var mutation = mutations[i].addedNodes;
				for (var x = 0; x < mutation.length; x++) {
					if (mutation[x].nodeName !== 'VIDEO' 
						&& mutation[x].nodeName !== 'OBJECT') continue;
					console.log('mutation', mutation[x]);

					observer.disconnect(); 
					return bindPlayer(mutation[x]);
				}
			}
		});
		observer.observe(document, { childList: true, subtree: true });
	}


	 // Привязывает обработчики событий, не связанных с просмотром / просмотром / каналом.
	proto.bindGeneral = function () {
		// Безопасность, если есть другое расширение, например.
		var original = window.onYouTubePlayerReady;

		/**
		 * Останавливает видео на каналах.
		 * Только один раз, когда плеер готов (e.g. doesn't fire on AJAX navigation /watch -> /watch)
		 * @param 	{Object}    	player 		The Youtube Player API Object
		 */
		window.onYouTubePlayerReady = function (player) {
			if (typeof player === 'undefined') {return;};
			console.log('player ready', player, player.getPlayerState(), player.getCurrentTime());

			if (player.getPlayerState() === 3) { 
					window.setTimeout(function () {
						if (!document.hidden)
						_pause(player);
					}, 1000);
			} else	
			if (player.getPlayerState() > 1) { 
			// Не останавливайся слишком рано (идет буферизация)
				stopAutoplay(player);
				console.log(player.getCurrentTime());
			}

			if (original) original();
		}
	}


	// старт процесс автостопа
	new StopAutoplay();

	console.info('loaded');
}(window));

