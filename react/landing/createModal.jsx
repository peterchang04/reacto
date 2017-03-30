import React, { Component } from 'react';
import './createModal.css';
import {Form,Request} from '../js/$$';
import Select from '../common/select';

class C extends Component {
	render() {
		return (
			<div className="modal fade" id="createModal" tabIndex="-1" role="dialog" data-backdrop="static">
				<div id="fb-root"></div>

				<form id="createForm" className="vertical-alignment-helper">
					<div className="modal-dialog modal-sm vertical-align-center" role="document">
						<div className="modal-content">
							<div className="modal-body">
								<i className="fa fa-times-circle closeModal" data-target="#createModal" data-toggle="modal"></i>
								<h4>Almost there...</h4>
								<input id="first_name" type="text" name="first_name" placeholder="first name" data-valid="required" />
								<input id="last_name" type="text" name="last_name" placeholder="last name" data-valid="required" />
								
								<Select name="instrument" multiple="true" optionsRequest="/instrument" placeholder="instruments" data-valid="required" />
								
								<input id="email" name="email" placeholder="email" data-valid="required,email" />
								<input id="password" type="password" name="password" placeholder="password" data-valid="required,password" />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-sm btn-secondary pull-left">Login</button>
								<button type="button" onClick={this.submit} className="btn btn-sm btn-primary">Create Account</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
	submit(){
		if(Form.validate('createForm')){
			var data = Form.getValue('createForm');
			data.method = "createPerson";
			new Request({
				method:"post",
				path:'/person',
				data:data,
				complete:(res,err) => {
					if(err)console.log(err);
					console.log(res);
				}
			});
		}
	}
	/*
	showInstruments(res){
		$('#instrument').selectize({
			delimiter:',',
			persist:false,
			maxItems:3,
			create:false,
			options:res,
			valueField:'id',
			labelField:'name',
			onBlur:function(){
				var event = document.createEvent('UIEvents');
				event.initEvent('blur',true,true);
				document.getElementById('instrument').dispatchEvent(event);
			},
			onChange:function(){
				var event = document.createEvent('UIEvents');
				event.initEvent('blur',true,true);
				document.getElementById('instrument').dispatchEvent(event);
			}
		});
	}
	*/
	componentDidMount(){
		new Request({
			path:('/instrument'),
			complete:(res,err) => {
				if(!err){
					//this.showInstruments(res);
				}
			}
		});
	}
}

export default C;