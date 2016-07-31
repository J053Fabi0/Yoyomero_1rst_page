var parent = $(window),
    	$video = $("video");
		// https://raw.github.com/brianreavis/jquery-fitToParent/master/jquery.fittoparent.js
		var resize = function () {
			var o = {
				fitX: true,
				fitY: true,
				fillArea: false,
				allowEnlargement: true
			};
			
			parentWidth = parent.innerWidth(),
			parentHeight = parent.innerHeight();

			var originalSize = $video.data('original-size');
			if (!originalSize) {
				originalSize = {
					width:  1280,
					height: 720
				};
				$video.data('original-size', originalSize);
			}

			var currentSize = {
				width:  originalSize.width,
				height: originalSize.height
			};

			var scale = 1;
			if (o.fitX && (o.allowEnlargement || currentSize.width > parentWidth)) {
				scale = parentWidth / currentSize.width;
				currentSize.width = Math.floor(currentSize.width * scale);
				currentSize.height = Math.floor(currentSize.height * scale);
			}

			if (o.fitY) {
				var doScale = currentSize.height > parentHeight;
				var newScale = parentHeight / currentSize.height;
				if (o.fillArea) doScale = currentSize.height < parentHeight;
				if (o.allowEnlargement) doScale = newScale > scale;
				if (doScale) {
					currentSize.width = Math.floor(currentSize.width * newScale);
					currentSize.height = Math.floor(currentSize.height * newScale);
					scale = newScale;
				}
			}

			$video.css({
				top: Math.round((parentHeight - currentSize.height) / 2),
				left: Math.round((parentWidth - currentSize.width) / 2),
				width: currentSize.width,
				height: currentSize.height,
				
			});
		}
		
		
		$(window).on("resize",resize);
	
		resize();