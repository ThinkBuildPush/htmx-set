class _growl
{
	constructor( _opts )
	{
		let _defaults = { msg: null, type: 'error' };

		this.opts = { ..._defaults, ..._opts };

		this.state_classes =
		{
			'info':		'info',
			'error':	'danger',
			'success':	'success',
			'warning':	'warning'
		}

		this.state_text_classes =
		{
			'info':		'primary',
			'error':	'white',
			'success':	'white',
			'warning':	'primary'
		}

		this.opts.state = this.state_classes[this.opts.type];
		this.opts.state_text = this.state_text_classes[this.opts.type];

		console.log( '_growl _opts' );
		console.log( this.opts );

		return this.growl();
	}

	growl()
	{
		let _now = Date.now();
		let _count = $( '.growl' ).length + 1;
		let _id = _now + '-' + _count;
		console.log( 'growl id' );
		console.log( _id );
		$( '#growl_container' ).append( new _jig({ tpl: 'growl_tpl', data: { growl: this.opts.msg, id: _id, state: this.opts.state, state_text: this.opts.state_text }, default: '-' }).popTpl() );
		setTimeout(
			function()
			{
				$( '#growl_' + _id ).fadeOut( 1000,
					function()
					{
						$( '#growl_' + _id ).remove();
					}
				);
			}, 3000
		)
	}
}
