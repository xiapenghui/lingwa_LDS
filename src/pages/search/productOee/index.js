import { PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Tag, Table, Row, Col, Card } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment'
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import '../../../../src/assets/commonStyle.css';
import globalConfig from '../../../../config/defaultSettings';
import './components/common.css';
import ExportJsonExcel from 'js-export-excel';
import {
  getDepartement,
  postListInit,
  getArea,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from '@/services/search/productOee';
import { BackgroundColor } from 'chalk';

const productOeeComponent = ({
  productOee,
  dispatch
}) => {
  const {
    productList,
    areaList,
    shifList
  } = productOee
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [titleInfo, settitleInfo] = useState('122');


  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataSum, setDataSum] = useState([])


  const columns = [

    {
      title: '班次',
      dataIndex: 'shiftid',
      align: 'center',
      width: 100,
      fixed: 'left',
      render: (text, action) => {
        if (action.shiftid == 0) {
          return text = '-'
        }
      },
    },


    {
      title: '产品族',
      dataIndex: 'productarea',
      align: 'center',
      width: 100,
      fixed: 'left'
    },


    {
      title: '日期',
      dataIndex: 'tsdate',
      align: 'center',
      width: 100,
      fixed: 'left',
    },




    {
      title: 'UT',
      dataIndex: 'ut',
      align: 'center',
      width: 100,
    },

    {
      title: 'DT',
      dataIndex: 'dt',
      align: 'center',
      width: 100,
    },

    {
      title: 'OT',
      dataIndex: 'ot',
      align: 'center',
      width: 100,
    },


    {
      title: 'TS',
      dataIndex: 'ts',
      align: 'center',
      width: 100,
    },


    {
      title: 'KE',
      dataIndex: 'ke',
      align: 'center',
      width: 100,
      render: (text, record) => {
        let color = parseInt(record.ke * 100) < record.targetke ? 'red' : 'green';
        if (parseInt(record.ke * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseInt(record.ke * 100) + '%'}
            </Tag>
          )
        } else {
          return <span> {parseInt(record.ke * 100) + '%'}</span>
        }
      }
    },



    {
      title: 'IE',
      dataIndex: 'ie',
      align: 'center',
      width: 100,
      render: (text, record) => {
        let color = parseInt(record.ie * 100) < record.targetie ? 'red' : 'green';
        if (parseInt(record.ie * 100) < record.targetie) {
          return (
            <Tag color={color}>
              {parseInt(record.ie * 100) + '%'}
            </Tag>
          )
        } else {
          return <span> {parseInt(text * 100) + '%'}</span>
        }
      }
    },


    {
      title: '目标KE',
      dataIndex: 'targetke',
      align: 'center',
      width: 100,
      render: (text) => {
        return text + '%';
      }
    },

    {
      title: '目标IE',
      dataIndex: 'targetie',
      align: 'center',
      width: 100,
      render: (text) => {
        return text + '%';
      }
    },



    {
      title: 'KS',
      dataIndex: 'ks',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseInt(text * 100) + '%';
      }
    },

    {
      title: 'gap',
      dataIndex: 'gap',
      align: 'center',
      width: 100,
      render: (text) => {
        let color = text < 0 ? 'red' : 'green';
        if (text < 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }
    },

    {
      title: '排班',
      dataIndex: 'planot',
      align: 'center',
      width: 100,
    },


    {
      title: '工作时间',
      dataIndex: 'rot',
      align: 'center',
      width: 100,
    },

    {
      title: '休假',
      dataIndex: 'relax',
      align: 'center',
      width: 100,
    },

    {
      title: '借入',
      dataIndex: 'borrow',
      align: 'center',
      width: 100,
    },


    {
      title: '借出',
      dataIndex: 'lend',
      align: 'center',
      width: 100,
    },


    {
      title: '领班T4',
      dataIndex: 'lbot',
      align: 'center',
      width: 100,
    },



    {
      title: 't0',
      dataIndex: 't0',
      align: 'center',
      width: 100,
      render: (text) => {
        let color = text < 0 || text != 0 ? 'red' : 'green';
        if (text < 0 || text != 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }
    },

    {
      title: 't1',
      dataIndex: 't1',
      align: 'center',
      width: 100,
    },

    {
      title: 't2',
      dataIndex: 't2',
      align: 'center',
      width: 100,
    },

    {
      title: 't3',
      dataIndex: 't3',
      align: 'center',
      width: 100,
    },


    {
      title: 't4',
      dataIndex: 't4',
      align: 'center',
      width: 100,
    },


    {
      title: 't5',
      dataIndex: 't5',
      align: 'center',
      width: 100,
    },



    {
      title: '产量',
      dataIndex: 'goodparts',
      align: 'center',
      width: 120,
    },



    {
      title: '目标产量',
      dataIndex: 'targetparts',
      align: 'center',
      width: 120,
    },

  ];



  const getColumns = () => [

    {
      title: '时间从',
      dataIndex: 'tsdateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),

    },


    {
      title: '时间至',
      dataIndex: 'tsdateEnd',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      // hideInTable: true,
      valueEnum: shifList.length == 0 ? {} : shifList,
      initialValue: ['早班'],
      // initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(shifList)) {
            newList.push({ key: key, label: value.text })
          }
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {newList.map(function (item, index) {
              return <Select.Option key={index} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },

    {
      title: '产品族',
      dataIndex: 'productareaid',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.productareaid ? UpdateDate.productareaid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(areaList)) {
            newList.push({ key: key, label: value.text })
          }
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {newList.map(function (item, index) {
              return <Select.Option key={index} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },


    {
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'date',
      align: 'center',
      hideInSearch: true,
      width: 120,
      fixed: 'left',
    },

    {
      title: 'UT',
      dataIndex: 'ut',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: 'DT',
      dataIndex: 'dt',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: 'OT',
      dataIndex: 'ot',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: 'KE',
      dataIndex: 'ke',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color = parseInt(record.ke * 100) < record.targetke ? 'red' : 'green';
        if (parseInt(record.ke * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseInt(record.ke * 100) + '%'}
            </Tag>
          )
        } else {
          return <span> {parseInt(record.ke * 100) + '%'}</span>
        }
      }
    },



    {
      title: 'IE',
      dataIndex: 'ie',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color = parseInt(record.ie * 100) < record.targetie ? 'red' : 'green';
        if (parseInt(record.ie * 100) < record.targetie) {
          return (
            <Tag color={color}>
              {parseInt(record.ie * 100) + '%'}
            </Tag>
          )
        } else {
          return <span> {parseInt(text * 100) + '%'}</span>
        }
      }
    },


    {
      title: '目标KE',
      dataIndex: 'targetke',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text) => {
        return text + '%';
      }
    },

    {
      title: '目标IE',
      dataIndex: 'targetie',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text) => {
        return text + '%';
      }
    },



    {
      title: 'KS',
      dataIndex: 'ks',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text) => {
        return parseInt(text * 100) + '%';
      }
    },

    {
      title: 'gap',
      dataIndex: 'gap',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 ? 'red' : 'green';
        if (text < 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }
    },

    {
      title: '排班',
      dataIndex: 'planot',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: '工作时间',
      dataIndex: 'rot',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: '休假',
      dataIndex: 'relax',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: '借入',
      dataIndex: 'borrow',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: '借出',
      dataIndex: 'lend',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },



    {
      title: '领班T4',
      dataIndex: 'lbot',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },




    {
      title: 't0',
      dataIndex: 't0',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 || text != 0 ? 'red' : 'green';
        if (text < 0 || text != 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }

    },

    {
      title: 't1',
      dataIndex: 't1',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: 't2',
      dataIndex: 't2',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: 't3',
      dataIndex: 't3',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: 't4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },


    {
      title: 't5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },



    {
      title: '产量',
      dataIndex: 'goodparts',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },



    {
      title: '目标产量',
      dataIndex: 'targetparts',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      // render: (text) => {
      //   return parseInt(text * 100) + '%';
      // }
    },

    // {
    //   title: '目标PRR',
    //   dataIndex: 'targetparts',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInSearch: true,
    //   // render: (text) => {
    //   //   return parseInt(text * 100) + '%';
    //   // }
    // },


    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed: 'right',
    //   render: (_, record) => (
    //     <>

    //       <a onClick={() => {
    //         setIsUpdate(true)
    //         setUpdateDate({ ...record });
    //         handleUpdateModalVisible(true);
    //       }}
    //       >编辑</a>
    //     </>
    //   ),
    // },
  ];



  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      familyid: Number(params.familyid),
      productareaid: Number(params.productareaid),
      shiftid: params.shiftid[0] == "早班" ? 1 : params.shiftid,
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      PageIndex: params.current,
      PageSize: params.pageSize
    })
    return TableList.then(function (value) {
      setDataSum(value.list.sum)
      return {
        data: value.list.detail,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total
      }
    });
  }

  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost({ data: fields });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('添加失败请重试！');
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */


  const handleUpdate = async (fields) => {
    const hide = message.loading('正在编辑');
    console.log('handleUpdate', fields)
    try {
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('编辑失败请重试！');
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        data: selectedRows.map((row) => row.customer),
      });

      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }

    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };


  // 导出
  const downloadExcel = async (selectedRows) => {
    var option = {};
    var dataTable = [];
    if (selectedRows.length > 0) {
      for (let i in selectedRows) {
        let obj = {
          'shiftname': selectedRows[i].shiftname,
          'productarea': selectedRows[i].productarea,
          'tsdate': selectedRows[i].tsdate,
          'ut': selectedRows[i].ut,
          'dt': selectedRows[i].dt,
          'ot': selectedRows[i].ot,
          'ts': selectedRows[i].ts,
          'ke': parseInt(selectedRows[i].ke * 100) + '%',
          'ie': parseInt(selectedRows[i].ie * 100) + '%',
          'targetke': parseInt(selectedRows[i].targetke) + '%',
          'targetie': parseInt(selectedRows[i].targetie) + '%',
          'ks': parseInt(selectedRows[i].ks * 100) + '%',
          'gap': selectedRows[i].gap,
          'planot': selectedRows[i].planot,
          'rot': selectedRows[i].rot,
          'relax': selectedRows[i].relax,
          'lend': selectedRows[i].lend,
          'borrow': selectedRows[i].borrow,
          'lbot': selectedRows[i].lbot,
          't0': selectedRows[i].t0,
          't1': selectedRows[i].t1,
          't2': selectedRows[i].t2,
          't3': selectedRows[i].t3,
          't4': selectedRows[i].t4,
          't5': selectedRows[i].t5,
          'goodparts': selectedRows[i].goodparts,
          'targetparts': selectedRows[i].targetparts,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '产品族查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['shiftname', 'productarea', 'tsdate', 'ut', 'dt', 'ot', 'ts', 'ke', 'ie', 'targetke', 'targetie', 'gap',
          'ks', 'planot', 'rot', 'relax', 'lend', 'borrow', 'lbot', 't0', 't1', 't2', 't3', 't4', 't5', 'goodparts', 'targetparts'],
        sheetHeader: ['班次', '产品族', '日期', 'UT', 'DT', 'OT', 'TS', 'KE', 'IE', '目标ke', '目标ie', 'KS', 'gap', '排班', '工作时间', '休假', '借入', '借出',
          '领班T4', 't0', 't1', 't2', 't3', 't4', 't5', '产量', '目标产量'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }


  return (
    <PageContainer>
      <ProTable
        tableExtraRender={(_, data) => (
          <>
            <Card>
              <Table
                title={() => <span style={{ fontSize: '17px' }}>列表求和：<span style={{ color: 'red', fontSize: '15px', marginLeft: '10px' }}> *OT=考勤工时 - 休息时间 - LDS的T4, 工作时间=考勤工时 + T5</span></span>}
                scroll={{ x: 2500, y: 400 }}
                rowSelection={{
                }} columns={columns} dataSource={dataSum} pagination={false} />
            </Card>
          </>
        )}
        headerTitle={
          <>
            <span>查询表格</span>
            <span style={{ color: 'red', fontSize: '16px', marginLeft: '10px' }}>*gap=排班-工作时间-借出+借入-休假-领班T4 ,  *T0=OT-DT-T1-T2-T3</span>
          </>
        }
        actionRef={actionRef}
        scroll={{ x: 2500, y: 400 }}
        rowKey="row"
        pagination={false}

        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> 新建
        //   </Button>,
        // ]}

        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>

              </span>
            </div>
          }
        >
          {/* <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button> */}


          <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button>

        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title='新建'
      >

        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="row"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false)
            handleUpdateModalVisible(false)
          }
          }
          modalVisible={updateModalVisible}
          title='编辑'
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false)
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="row"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}


    </PageContainer>
  );
};

export default connect(({ productOee }) => ({ productOee }))(productOeeComponent);



