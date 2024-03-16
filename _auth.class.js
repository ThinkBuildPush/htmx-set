class _auth
{
	constructor( _opts )
	{
		console.log( '_auth constructor' );
		console.log( _opts );

		let _defaults = { form_id: null, _mem_login: null, _mem_password: null };
		this.opts = { ..._defaults, ..._opts };

		console.log( '_auth constructor opts' );
		console.log( this.opts );
		return this;
	}

	logout()
	{
		let o_store = new _store();
		o_store.del( 'auth_token' );
		o_store.del( 'auth_token_type' );
		o_store.del( 'auth_token_scope' );
		o_store.del( 'auth_token_expires' );

		document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		window.location.href = "/_auth/logout";
	}

	auth()
	{
		let $this = this;
		return new Promise(
			( _success, _fail ) =>
			{
				let _data = {};
				if( $this.opts.form_id )
				{
					_data = new _form({ form_id: $this.opts.form_id }).getFormData();
				}
				else
				{
					_data = $this.opts;
				}

				new _api({ url: '/_auth/password', data: _data })
					.poll()
					.then(
						( _ret ) =>
						{
							console.log( 'init.auth _ret' );
							console.log( _ret );

							console.log( 'typeof auth_token' );
							console.log( typeof _ret.data.auth_token );
							console.log( 'auth api auth_token' );
							console.log( _ret.data.auth_token );
							if( 'undefined' !== typeof _ret.data.auth_token )
							{
								console.log( 'auth_token not undefined' );
								let o_store = new _store();
								o_store.del( 'auth_token' );
								o_store.del( 'auth_token_type' );
								o_store.del( 'auth_token_scope' );

								o_store.put( 'auth_token', _ret.data.auth_token );
								o_store.put( 'auth_token_expires', _ret.data.expires );

								const d = new Date();
								d.setTime(d.getTime() + (1*24*60*60*1000));
								let expires = "expires="+ d.toUTCString();
								console.log( 'auth cookie set' );
								console.log( "auth_token=" + _ret.data.auth_token + ";" + expires + ";path=/" );
								document.cookie = "auth_token=" + _ret.data.auth_token + ";" + expires + ";path=/";
							}

							return _success( 'User authenticated' );
						}
					)
					.catch(
						( _xhr, _textStatus, _errorThrown ) =>
						{
							console.log( 'auth error' );
							console.log( _xhr );
							console.log( _textStatus );
							console.log( _errorThrown );
							return _fail( _textStatus + ' ' + _errorThrown );
						}
					);
			}
		);
	}
}
