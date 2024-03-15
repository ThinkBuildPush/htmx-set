class _dom
{
	constructor( _opts )
	{
		console.log( '_dom constructor' );
		console.log( _opts );

		let _defaults = {};
		this.opts = { ..._defaults, ..._opts };

		console.log( '_dom constructor opts' );
		console.log( this.opts );
		return this;
	}

	static getData( _elemId, _attr )
	{
		_elemId = _elemId.replace( '#', '' );
		let _elem = document.getElementById( _elemId );
		if( !_elem )
		{
			console.log( 'element not in dom for data retrieval ' + _elemId + ' ' + _attr );
			return false;
		}

		console.log( 'getData returned' );
		console.log( document.getElementById( _elemId ).dataset[_attr] );

		return document.getElementById( _elemId ).dataset[_attr];
	}

	static setData( _elemId, _attr, _val )
	{
		_elemId = _elemId.replace( '#', '' );
		let _elem = document.getElementById( _elemId );
		if( !_elem )
		{
			console.log( 'element not in dom for data setting ' + _elemId + ' ' + _attr );
			return false;
		}

		console.log( 'setData returned' );
		console.log( document.getElementById( _elemId ).dataset );
		document.getElementById( _elemId ).dataset[_attr] = _val;

		return _val;
	}
}
