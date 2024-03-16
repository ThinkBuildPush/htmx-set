class _api
{
	constructor( _opts )
	{
		let _defaults = { url: null, method: 'POST', data: new Array(0), force_fetch: true };

		this.opts = { ..._defaults, ..._opts };
	}

	poll()
	{
		let o_store = new _store();
		this.opts.auth_token = o_store.fetch( 'auth_token' );

		let $this = this;
		return new Promise(
			( _resolve, _reject ) =>
			{
				if( !$this.opts.url )
				{
					return _reject( 'no_url_in_api_opts' );
				}

				console.log( 'poll auth_token' );
				console.log( $this.opts.auth_token );
				$.ajax({
					method: $this.opts.method,
					url: $this.opts.url,
					data: $this.opts.data,
					headers:
					{
						auth_token: $this.opts.auth_token
					},
					success: function( _ret )
					{
						console.log( $this.opts.url + ' success' );
						return _resolve( _ret );

					},
					error: function( _ret )
					{
						console.log( $this.opts.url + ' failure' );
						$( '#result_display' ).removeClass( 'text-success' ).addClass( 'text-danger' );
						if( 'undefined' != typeof _ret.msg && _ret.msg )
						{
							console.log( 'prepending' );
							$( '#result_display' ).prepend( _ret.msg + "<br />" );
						}
						return _reject( _ret );
					}
				}).always(
					( _ret, _textStatus, _xhr ) =>
					{
						console.log( 'api always response header for ' + $this.opts.url );
						// console.log( _xhr.getAllResponseHeaders() );
						console.log( _xhr.status );
						console.log( '/api always response_header for ' + $this.opts.url );

						switch( _xhr.status )
						{
							case 200:
								if( $this.opts.auth_token != _xhr.getResponseHeader( 'auth_token' ) )
								{
									let o_store = new _store();
									o_store.put( 'auth_token', _xhr.getResponseHeader( 'auth_token' ) );
									o_store.put( 'auth_token_expires', _xhr.getResponseHeader( 'auth_token_expires' ) );
									console.log( 'auth_token updated' );
									return _resolve( _xhr );
								}
								break;
							case 403:
								console.log( 'Invalid path! ' + $this.opts.url );
								return _reject( 'Invalid Path' );
							case 401:
								console.log( 'Unathed' );
								return _reject( 'Not logged in' );
							case 400:
								console.log( 'Bad Request' );
								return _reject( 'Invalid or missing information' );
							case 403:
								console.log( 'Path Unauthorized' );
								return _reject( 'Not Authorized' );
							case 404:
								console.log( 'Path not found' );
								return _reject( 'Path not found' );
						}
					}
				);
			}
		);
	}
}
