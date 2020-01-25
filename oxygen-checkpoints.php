<?php
/*
Plugin Name: Oxygen Checkpoints
Author: Gagan S Goraya
Author URI: https://gagangoraya.com
Description: Create checkpoints of your oxygen state in the builder and revert to any checkpoint anytime
Version: 1.0.1
*/

class TH_Oxygen_Checkpoints {

	const VERSION = '1.0.1';
	const PREFIX = 'thoxycheckpoints';

	static function init() {
		add_action("wp_enqueue_scripts", array(__CLASS__, "scripts"), 11);
		add_action("wp_footer", array(__CLASS__, "footer"));
	}

	static function scripts() {
		if(!defined("SHOW_CT_BUILDER")) {
			return;
		}

		if ( !defined("OXYGEN_IFRAME") ) {
			wp_enqueue_script(self::PREFIX.'-script', plugins_url('js/script.js', __FILE__), array('ct-angular-ui'), self::VERSION);
		
			wp_enqueue_style(self::PREFIX.'-style', plugins_url('css/style.css', __FILE__), array(), self::VERSION);
		}
	}

	static function footer() {

		if ( !defined("SHOW_CT_BUILDER") || defined("OXYGEN_IFRAME") ) {
			return;
		}
		
		?>
		<div id="oxygen-checkpoints-panel" style="display: none">
			<svg class="oxygen-close-icon"><use xlink:href="#oxy-icon-cross"></use></svg>
		</div>
		<?php
	}
}

TH_Oxygen_Checkpoints::init();