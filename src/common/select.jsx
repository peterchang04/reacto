import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Request from '../js/httpRequest';
import slickVal from '../js/slickValidate';

export default class C extends Component{
	constructor(props){
		super(props);
		// default values
		props = Object.assign({
			value:"",
			options:[],
			placeholder:props.name, // default to name
			"data-valid":""
		},props);
		
		this.state = {
			value:props.value,
			options:props.options
		};
	}
	render(){
		return (
			<Select 
				name={this.props.name}
				className={"Select_"+this.props.name}
				value={this.state.value} 
				options={this.state.options}
				placeholder={this.props.placeholder}
				multi={true} 
				onChange={this.updateState.bind(this)}
			/>
		);
	}
	componentWillMount(){
		if(this.props.optionsRequest){
			new Request({
				path:(this.props.optionsRequest),
				complete:(res,err) => {
					if(!err){
						var options = res.map((el)=>{
							el.value = el.id;
							el.label = el.name;
							return el;
						});
						this.setState({options:options});
					}
				}
			});
		}
	}
	componentDidMount(){
		// apply validation, mimic slickValidate
		if(this.props["data-valid"]){
			var rSelect = document.getElementsByClassName('Select_'+this.props.name)[0];
			rSelect.setAttribute('data-valid',this.props["data-valid"]);
		}
	}
	updateState(val){
		this.setState({value:val});
	}
}