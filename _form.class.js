class _form
{
	constructor( _opts )
	{
		// Should have a form_id at the minimum
		console.log( '_form constructor' );
		console.log( _opts );

		let _defaults = { form_id: null, method: 'POST', autoform: false };
		this.opts = { ..._defaults, ..._opts };

		console.log( '_form constructor opts' );
		console.log( this.opts );
		return this.setup();
	}

	autoform()
	{
		let $this = this;
		return new Promise(
			( _success, _fail ) =>
			{
				let _selector = 'form.autoform';
				if( $this.opts.autoform )
				{
					_selector = $this.opts.form_id;
				}

				console.log( 'autoform selector ' + _selector );
				$( _selector ).each(
					( _index, _elem ) =>
					{
						console.log( 'elem' );
						console.log( _elem );
						console.log( $( _elem ) );

						// These two lines allow for a dynamic setting of the form input and to use a generic form container
						let _formId = $( _elem ).attr( 'data-form-input-id' ) ? $( _elem ).attr( 'data-form-input-id' ) : $( _elem ).attr( 'id' );
						let _formSelector = $( _elem ).attr( 'id' );

						console.log( 'autoform ' + _selector + ' formId -->' + _formId );
						new _api({ url: '/_valid_field/form_fields/' + _formId }).poll().then(
							( _ret ) =>
							{
								if( 1 == _ret.return )
								{
									console.log( 'autoform success' );

									console.log('#' + _formSelector + '_fields');
									let _cFormFields = $( '#' + _formSelector + '_fields' );
									_cFormFields.empty();

									if( 0 == _ret.count )
									{
										_cFormFields.html( 'No fields to display' );
									}
									else
									{
										for( let _i in _ret.data )
										{
											let _field = _ret.data[_i];
											console.log( _field );
											let _fieldHtml = '';
											let _fieldLabel = '';
											let _table = '';
											if( !_field.default )
											{
												_field.default = '';
											}

											switch( _field.type )
											{
												case 'textarea':
													_fieldLabel = '<label for="' + _field.id + '">' + _field.name + '</label>';
													_fieldHtml = '<textarea name="' + _field.name + '" id="' + _field.id + '" class="form-control';
													if( _field.required )
													{
														_fieldHtml += " required";
													}
													_fieldHtml += '">' + _field.default + '</textarea>';

													break;
												case 'email':
												case 'password':
												case 'hidden':
												case 'date':
												case 'datetime-local':
												case 'number':
												case 'text':
													if( 'hidden' != _field.type )
													{
														_fieldLabel = '<label for="' + _field.id + '">' + _field.name + '</label>';
													}
													_fieldHtml = '<input type="' + _field.type + '" name="' + _field.name + '" id="' + _field.id + '" value="' + _field.default + '" class="form-control';
													if( _field.required )
													{
														_fieldHtml += " required";
													}
													_fieldHtml += '" />';
													break;
												case 'checkbox':
													_fieldLabel = '<label for="' + _field.id + '" class="form-check-label">' + _field.name + '</label><br />';
													if( !_field.default )
													{
														_field.default = 1;
													}

													_fieldHtml = '<input type="checkbox" name="' + _field.name + '" id="' + _field.id + '" value="' + _field.default + '" class="form-check-input';
													if( _field.required )
													{
														_fieldHtml += " required";
													}
													_fieldHtml += '" />';
													break;
												case 'select':
													console.log( 'select autoform' );
													console.log( _field );
													_table = _field.name.split( '_' );
													if( 'fk' == _table.shift() && 'id' == _table.pop() )
													{
														_table = _table.join( '_' );
													}

													_fieldLabel = '<label for="' + _field.id + '"><a href="javascript:void(0);" onClick="new _loader({}).load( \'' + _field.id + '\' );">' + _field.name + '</a></label>';
													_fieldHtml = '<select name="' + _field.name + '" id="' + _field.id + '" class="form-control">';
													_fieldHtml += '<option value="" class="keep">Select</option></select>';
													_fieldHtml += '<template id="' + _field.id + '_tpl"><option value="~~' + _table + '_id~~">~~' + _table + '_name~~</option></template>';
													break;
											}

											_cFormFields.append( '<div class="form-row">' + _fieldLabel + ' ' + _fieldHtml + '</div>' );
											if( 'select' == _field.type && _field.src )
											{
												new _loader({ src: _field.src, tpl: _field.id + '_tpl', populate: _field.id }).load( _field.id );
											}
										}
									}
								}
							}
						);
					}
				);
				return _success( 'autoformed' );
			}
		);
	}

	createForm( _elem )
	{

	}

	popForm()
	{
		let $this = this;
		return new Promise(
			( _success, _fail ) =>
			{
				let _formId = $this.opts.form_id;

				console.log( '_form popForm data' );
				tabconsole.log( $this.opts.data );

				for( let _i in $this.opts.data )
				{
					let _val = $this.opts.data[_i];
					console.log( '_i' );
					console.log( _i );
					console.log( _val );
					console.log( 'selector' );
					let _sel = _formId + ' [name="' + _i + '"]';
					console.log( _sel );
					let _type = $( _sel ).prop( 'type' );
					console.log( 'type' );
					console.log( _type );
					switch( _type )
					{
						case 'radio':
						case 'checkbox':
							if( !!_val )
							{
								$( _sel ).prop( 'checked', true );
							}
							else
							{
								$( _sel ).prop( 'checked', false );
							}
							break;
						case 'date':
							let _date = new moment( _val );
							$( _sel ).val( _date.format( 'YYYY-MM-DD') );
							break;
						default:
							console.log( 'default popForm type' );
							console.log( _type );
							$( _sel ).val( _val );
							break;
					}
				}

				return _success( 'popped' );
			}
		);
	}

	setup()
	{
		if( this.opts.form_id )
		{
			if( '#' != this.opts.form_id.substring( 0, 1 ) )
			{
				// We add it here in case it was left off so that the form can be found without throwing unnecessary errors.
				this.opts.form_id = '#' + this.opts.form_id;
			}
		}

		if( 'undefined' === typeof $( this.opts.form_id ) || !$( this.opts.form_id ).length )
		{
			console.log( 'form_id ' + this.opts.form_id + ' not in DOM' );
			return false;
		}

		// Gather some information from the form itself and save for later send()
		if( 'undefined' === typeof this.opts.action || !this.opts.action )
		{
			this.opts.action = $( this.opts.form_id ).prop( 'action' );
		}

		if( 'undefined' === typeof this.opts.method || !this.opts.method )
		{
			this.opts.method = $( this.opts.form_id ).prop( 'method' );
		}
	}

	validate()
	{
		let _validErrors = 0;

		// First we'll process all the required fields so that we can then do conditional requireds
		$( this.opts.form_id + ' .required' ).filter( ':input' ).each(
			function( _index, _elem )
			{
				console.log( 'required' );
				console.log( 'validate elem' );
				console.log( _elem );
				_elem = $( _elem );
				console.log( _elem );
				let _elemId = _elem.prop( 'id' );
				let _elemType = _elem.prop( 'type' );
				console.log( _elemId );
				console.log( _elemType );

				let _elemVal = _elem.val();
				console.log( 'elemVal' );
				console.log( _elemVal );
				switch( _elemType )
				{
					case 'select-one':
					case 'select-multiple':
						_elemVal = $( '#' + _elemId + ' option:selected' ).val();
						break;
				}
				console.log( _elemVal );

				if( !_elemVal )
				{
					console.log( _elem.val() );
					console.log( 'form field missing value' );
					console.log( _elemId );
					$( _elemId ).addClass( 'error' );
					_validErrors++;
				}
				else
				{
					$( _elemId ).removeClass( 'error' );
				}
			}
		);

		if( 0 == _validErrors )
		{
			return true;
		}

		console.log( 'error counts ' + _validErrors );
		return false;
	}

	send()
	{
		return new Promise( ( _success, _fail ) =>
		{
			if( !this.validate() )
			{
				console.log( 'not valid form ' + this.opts.form_id );
				return _fail( 'form_has_errors' );
			}

			var _data = new FormData( $( this.opts.form_id )[0] );

			let o_store = new _store();

			$.ajax({
				type: this.opts.method,
				enctype: 'multipart/form-data',
				url: this.opts.action,
				data: _data,
				headers:
				{
					auth_token: o_store.fetch( 'auth_token' )
				},
				processData: false,
				contentType: false,
				cache: false
			})
			.then(
				function( _ret )
				{
					console.log( 'form send ret' );
					console.log( _ret );
					return _success( _ret );
				}
			)
			.catch(
				function( _ret )
				{
					console.log( 'form send catch ret' );
					console.log( _ret );
					return _fail( _ret );
				}
			);
		});
	}

	getFormData()
	{
		let _formId = this.opts.form_id;
		console.log( 'getformData' );
		console.log( _formId );
		let _data = $( _formId ).serializeArray();
		console.log( _data );

		let _return = {};
		for( let _i in _data )
		{
			console.log( 'formData' );
			console.log( _i );
			console.log( _data[_i] );
			_return[_data[_i].name] = _data[_i].value;
		}

		return _return
	}

	resetForm()
	{
		let _formId = this.opts.form_id;
		console.log( 'resetform' );
		console.log( _formId );

		$( _formId )[0].reset();
		$( _formId + ' input:hidden' ).val( '' );

		return this;
	}
}
