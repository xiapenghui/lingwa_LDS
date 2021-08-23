import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Divider, Card, Row, Col, DatePicker, Select } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SearchOutlined, ClearOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, connect } from 'umi';
import globalConfig from '../../../../config/defaultSettings';
import moment from 'moment'
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  // supportTime,
  title,
  editable,
  select,
  datePicker,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  // const TableModelsData = supportTime
  // const { departmentList } = TableModelsData;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };



  const save = async (val) => {
    
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;



  const onChange = async (date, dateString) => {
    // console.log(date, dateString);
    
  }



  if (editable) {
    if (select) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title}不能为空.`,
            },
          ]}
        >
          <Select defaultValue="lucy" style={{ width: 120 }} ref={inputRef} >
            <Option value="lucy" >Lucy</Option>
          </Select>
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );

    } else if (datePicker) {
      
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title}不能为空.`,
            },
          ]}
        >
          <Input ref={inputRef} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    } else if (select == false && datePicker == false) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <Input ref={inputRef} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};




class supportTime extends React.Component {

  constructor(props) {

    const { departmentList } = supportTime;


    super(props);

    this.columns = [
      {
        title: '部门',
        dataIndex: 'departmentId',
        editable: true,
        select: true,
        datePicker: false,
      },
      {
        title: '日期',
        dataIndex: 'date',
        editable: true,
        select: false,
        datePicker: true,
      },
      {
        title: 'PaidHour',
        dataIndex: 'PaidHour',
        editable: true,
        select: false,
        datePicker: false,
      },

      {
        title: 't1',
        dataIndex: 't1',
        editable: true,
        select: false,
        datePicker: false,
      },

      {
        title: 't2',
        dataIndex: 't2',
        editable: true,
        select: false,
        datePicker: false,
      },

      {
        title: 'Gap',
        dataIndex: 'Gap',
        editable: true,
        select: false,
        datePicker: false,
        render: (text, action) => {
          return text = Number(action.t1) + Number(action.t2)
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) =>
          <span>
            <Popconfirm title="确认保存当前数据么?" >
              <a onConfirm={() => this.save(record.key)}>保存</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm title="确认删除当前数据么?" >
              <a onConfirm={() => this.handleDelete(record.key)}>删除</a>
            </Popconfirm>
          </span>
      },


    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          departmentId: '0',
          date: '0',
          PaidHour: '0',
          t1: '0',
          t2: '0',
          Gap: '0'
        },

      ],
      count: 2,
    };
  }


  //查询
  handleSearch = (values) => {
    console.log('Success:', values);
  };


  //重置
  // handleResetFields = (value) => {
  //   
  //   form.resetFields();
  // }


  //删除
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  // 新建
  handleAdd = () => {
    // console.log(this.props.departmentList,'departmentList')
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      departmentId: '0',
      date: '0',
      PaidHour: '0',
      t1: '0',
      t2: '0',
      Gap: '0',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  //保存
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {

    const {
      departmentList
    } = this.props
    console.log('departmentList', departmentList)
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          select: col.select,
          datePicker: col.datePicker,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });


    return (
      <PageContainer>
        <Card style={{ width: '100%', height: '80px' }}>
          <Form
            className="ant-advanced-search-form"
            onFinish={this.handleSearch}
            // form={this.form}
            name="form_in_modal"
            initialValues={{
              sdate1: moment().subtract(1, "years"),
              sdate2: moment().endOf('day')
            }}>
            <Row gutter={40}>
              <Col span={6}>
                <Form.Item
                  name="sdate1"
                  label="开始时间"
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>

              </Col>
              <Col span={6}>

                <Form.Item
                  name="sdate2"
                  label="结束时间"
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="departmentid"
                  label="部门"
                >
                  {/* <Select
                    allowClear
                    showSearch
                  >
                    {departmentList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                    })}
                  </Select> */}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Button type="primary" htmlType="submit"><SearchOutlined />查询</Button>
                {/* <Button style={{ marginLeft: '7px' }} onClick={() => this.handleResetFields()}><ClearOutlined />清空</Button> */}
              </Col>
            </Row>
          </Form>


        </Card >

        <div>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{
              margin: '10px 0',
            }}
          >
            <PlusOutlined />
            新建
        </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </PageContainer >
    );
  }
}
export default connect(({ supportTime }) => ({ supportTime }))(supportTime);
// export default supportTime