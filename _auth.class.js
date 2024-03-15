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
							if( 1 == _ret.return )
							{
								console.log( 'init.auth _ret' );
								console.log( _ret );

								new _growl({ growl: _ret.msg, type: _ret.return ? 'success' : 'danger' });

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

								window.location.href = '/';
							}
							else
							{
								console.log( 'init.auth failed' );
								tabconsole.log( _ret );
								return _fail( _ret );
							}
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

function register()
{
	let _username = $( '#auth_user__mem_login' ).val();
	let _usernameVerify = $( '#auth_user__mem_login_verify' ).val();

	if( _username != _usernameVerify )
	{
		growl( 'register_username_mismatch', { type: 'danger' } );
		return false;
	}

	if( !$( '#auth_user_tos_agree' ).is( ':checked' ) )
	{
		growl( 'register_tos_not_checked', { type: 'danger' } );
		return false;
	}

	$.post(
		'/_register/register',
		{
			_mem_login: _username,
			_mem_login_verify: _usernameVerify,
			tos_agree: $( '#auth_user_tos_agree' ).is( ':checked' ),
		}
	)
	.done(
		function( _ret )
		{
			console.log( 'register.auth _ret' );
			tabconsole.log( _ret.data );

			growl( _ret.msg, { type: _ret.return ? 'success' : 'danger', 'delay': 10000 } );

			if( 1 == _ret.return )
			{
				console.log( typeof _ret.data.auth_token );
				console.log( _ret.data.auth_token );
				if( 'undefined' !== typeof _ret.data.auth_token )
				{
					let _store = new _store();
					_store.put( 'auth_token', _ret.auth_token );
					_store.put( 'auth_token_type', _ret.token_type );
					_store.put( 'auth_token_scope', _ret.scope );

					let _moment = new moment();
					_moment.add( _ret.expires_in, 'seconds' );
					_store.put( 'auth_token_expires', _moment.format( 'X' ) );

				}

				console.log( 'redirect post auth' );
				console.log( 'https://' + _ret.data.subscriber_domain );
				window.location.href = 'https://' + _ret.data.subscriber_domain;
			}
		}
	)
	.fail(
		function( _xhr, _textStatus, _errorThrown )
		{
			console.log( 'init.auth failed' );
			tabconsole.log( _xhr );
			console.log( _textStatus );
			console.log( _errorThrown );
		}
	);
}

function growl( _msg, _vars )
{
	console.log( _msg );
	console.table( _vars );
}
