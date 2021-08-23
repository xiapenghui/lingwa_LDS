import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
// import { Radio  } from '@ant-design/pro-form';
// import ProCard from '@ant-design/pro-card';
import { SearchOutlined, ClearOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import globalConfig from '../../../../config/defaultSettings';
import { Table, Input, Button, Popconfirm, Form, Divider, Card, Row, Col, DatePicker, Select, Radio, message } from 'antd';
import {
  getDepartement,
} from '@/services/time/supportTime';
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const defaultData = [
  {
    id: 624748504,
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    title: '活动名称一',
    t1: '0',
    t2: '0',
    Gap: '0'
  },
  {
    id: 111,
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    title: '活动名称一',
    t1: '0',
    t2: '0',
    Gap: '0'
  }
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [newList, setnewList] = useState([]);
  // const [columnsList, setColumnsList] = useState([]);

 
  const columns = [

    {
      title: '部门',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门不能为空!',
          },
        ],
      },
    },

    {
      title: '日期',
      dataIndex: 'created_at',
      valueType: 'date',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '日期不能为空!',
          },
        ],
      },
    },

    {
      title: 'PaidHour',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'PaidHour不能为空!',
          },
        ],
      },
    },
    

    {
      title: 't1',
      dataIndex: 't1',
      valueType: 'text',
    },

    {
      title: 't2',
      dataIndex: 't2',
      valueType: 'text',
    },


    {
      title: 'Gap',
      dataIndex: 'Gap',
      valueType: 'text',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          // 返回新的组件
          return <Input disabled></Input>
        }
        return defaultRender(_);
      },
      render: (text, action) => {
        return text = Number(action.t1) + Number(action.t2)
      }
    },


    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => {

          var _a;
          (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
        }}>
          编辑
        </a>,
        <a key="delete" onClick={() => {
          setDataSource(dataSource.filter((item) => item.id !== record.id));
        }}>
          删除
        </a>,
      ],
    },
  ];


  //数据初始化
  useEffect(() => {
    Departement()
  }, []);



  //查询
  const handleSearch = (values) => {
    console.log('Success:', values);
  };


  const Departement = async () => {
    try {
      let data = await getDepartement();
      if (data.status == '200') {
        let newData = []
        for (let [key, value] of Object.entries(data.list)) {
          setnewList(newData.push({ key: key, label: value.text }))
          console.log('123456789', newData)
        }
      }
    } catch (error) {
      message.error('获取失败请重试！');
      return false;
    }
  };





  return (<>
    <PageContainer>
      <Card style={{ width: '100%', height: '80px', marginBottom: '20px' }}>
        <Form
          className="ant-advanced-search-form"
          onFinish={handleSearch}
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
                <Select
                  allowClear
                  showSearch
                >
                  {newList.length != null ? newList.map(function (item, index) {
                    return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                  }) : ''}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Button type="primary" htmlType="submit"><SearchOutlined />查询</Button>
              {/* <Button style={{ marginLeft: '7px' }} onClick={() => this.handleResetFields()}><ClearOutlined />清空</Button> */}
            </Col>
          </Row>
        </Form>


      </Card >

      <EditableProTable rowKey="id"
        columns={columns} request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })} value={dataSource} onChange={setDataSource} editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }} />
    </PageContainer >
  </>);
};