(function($) {
	$('document').ready(function() {
		let checkpoints = [];
		let frame = document.querySelector('iframe#ct-artificial-viewport');
		window.frameWindow = frame.contentWindow;

		

		let checkpointspanel = $(`
			<div class="ct-tab-panel ct-style-sheets-tab ng-scope" id="th-oxy-checkpoints" style="display:none">
				<div class="oxygen-sidepanel-header-row">
					Checkpoints				
				</div>
				<div class="ct-elements-managers-top clearfix">
					<div class="ct-elements-managers-top-item">
						<div class="ct-elements-managers-buttons" id="th-checkpoint-button-wrapper">
							
						</div>
					</div>
					
				</div>
				<div class="ct-elements-managers-bottom">

				</div>
				<small>Warning: These checkpoints won't persist, if you refresh the page. Neither are these saved to the database. These are meant only for the current session.</small>
			</div>`);

		function deleteItem(e) {
			let index = parseInt($(e.target).attr('data-index'));
			if(confirm('Are you sure, you want to DELETE this checkpoint?')) {
				checkpoints.splice(index, 1);
				renderList();
			}
		}

		function applyItem(e) {
			let index = parseInt($(e.target).attr('data-index'));
			if(confirm('Are you sure, you want to apply this checkpoint?')) {
				frameWindow.iframeScope.componentsTree = checkpoints[index]['data'];
				frameWindow.iframeScope.rebuildDOM();
				frameWindow.iframeScope.updateDOMTreeNavigator();
			}
		}

		function renderList() {
			let container = checkpointspanel.find('.ct-elements-managers-bottom');
			container.html('');

			let html = checkpoints.map(function(checkpoint, index) {
				return `
					<div class="th-checkpoint-item">
						<div class="th-checkpoint-delete"><svg data-index="${index}" class="oxygen-close-icon"><use xlink:href="#oxy-icon-cross"></use></svg></div>
						<div class="th-checkpoint-label">${checkpoint.label}</div>
						<div class="th-checkpoint-apply" ><button data-index="${index}">Apply</button></div>
					</div>
				`
			}).join("\n");

			container.html(html);

			container.find('.th-checkpoint-delete > svg').on('click', deleteItem);
			container.find('.th-checkpoint-apply > button').on('click', applyItem);
		}



		let panelclose = $(`<svg class="oxygen-close-icon"><use xlink:href="#oxy-icon-cross"></use></svg>`);
		
		panelclose.on('click', function() {
			frameWindow.iframeScope.parentScope.switchTab('sidePanel', '');
			frameWindow.iframeScope.parentScope.$apply();
			checkpointspanel.hide();
		});

		let addCheckpoint = $(`<div class="ct-button ct-icon-right">
							Add Checkpoint							<span class="ct-icon ct-plus-icon"></span>
						</div>`);

		addCheckpoint.on('click', function() {
			let label = prompt('Provide a label for the checkpoint');
			if(label.trim()!== '') {
				checkpoints.push({
					label: label,
					data: JSON.parse(JSON.stringify(window.frameWindow.iframeScope.componentsTree))
				});

				renderList();
			}
		})

		checkpointspanel.children('.oxygen-sidepanel-header-row').append(panelclose);
		checkpointspanel.find('#th-checkpoint-button-wrapper').append(addCheckpoint);

		let checkpointbutton = $("<div class=\"oxygen-toolbar-button-dropdown-option\" >Checkpoints</div>");
		$('.oxygen-manage-menu > .oxygen-toolbar-button-dropdown > div').on('click', function() {

			checkpointspanel.hide();
		})

		checkpointbutton.on('click', function() {
			frameWindow.iframeScope.parentScope.switchTab('sidePanel', '');
			frameWindow.iframeScope.parentScope.$apply();
			checkpointspanel.show();
		});

		$('#ct-sidepanel .ct-elements-managers-body').append(checkpointspanel);
		$('.oxygen-manage-menu > .oxygen-toolbar-button-dropdown').append(checkpointbutton);

		
	})
})(jQuery);

