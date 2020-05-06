import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
const Option=Select.Option
const FormItem = Form.Item;
class FilterForm extends React.Component{
    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const filterSubmit=this.props.filterSubmit
        const formItemList = [];
        if (formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let list=item.list
                let width=item.width
            if (item.type == 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    placeholder={placeholder} style={{width:width}}
                                >
                                {
                                    list.map(item=>{
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })
                                }
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                }else if(item.type==="时间查询"){
                    const datePicker=<span key="time">
                                        <FormItem >
                                            {
                                                getFieldDecorator('start_time')(
                                                   <DatePicker placeholder="开始时间"/>
                                                )
                                            }
                                        </FormItem>~
                                        <FormItem>
                                        {
                                                getFieldDecorator('end_time')(
                                                   <DatePicker  placeholder="结束时间"/>
                                                )
                                            }
                                        </FormItem>
                                        
                                       </span>
                           formItemList.push(datePicker)    
                } 
            })
        }
        return formItemList;
    }
    handleFilterSubmit=()=>{
        let {filterSubmit}=this.props
        this.props.form.validateFields((err,value)=>{
            if(!err){
                filterSubmit(value)
            }
        })
    }
    render(){
        return (
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);