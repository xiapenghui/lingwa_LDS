import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/product/productType';

const numberComponent = ({
  productType,
  dispatch
}) => {
  const {
    TableList,
    typeList,
    riskList,
    isNoList, } = productType
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataList, setDataList] = useState([]);

  const getColumns = () => [


    {
      title: '产品类型',
      dataIndex: 'producttype',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.producttype : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '产品类型不能为空!',
          },
        ],
      },
    },


    {
      title: '类型描述',
      dataIndex: 'producttypedec',
      valueType: 'textarea',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.producttypedec : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '类型描述不能为空!',
          },
        ],
      },
    },

  

    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <a onClick={() => {
            setIsUpdate(true)
            setUpdateDate({ ...record });
            handleUpdateModalVisible(true);
          }}
          >编辑</a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      productno: params.productno == null ? '' : params.productno,
      productname: params.productname == null ? '' : params.productname,
      PageIndex: params.current,
      PageSize: 10000,
    })
    return TableList.then(function (value) {
      setDataList(value.list);
      return {
        data: value.list,
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
      let data = await addPost(fields);
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
      let data = await updatePut({ productid: UpdateDate.productid, ...fields });
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
        productids: selectedRows.map((row) => row.productid),
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
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          'producttype': dataList[i].producttype,
          'producttypedec': dataList[i].producttypedec,
          'remark':dataList[i].remark,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '产品信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['producttype', 'producttypedec','remark'],
        sheetHeader: ['产品类型', '类型描述',  '备注'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }



  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        rowKey="productid"
        search={{
          labelWidth: 120,

        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => downloadExcel()}>
          <UploadOutlined /> 导出
        </Button>,

        ]}
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
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>

          {/* <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button> */}

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
          rowKey="productid"
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
            rowKey="productid"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ productType }) => ({ productType }))(numberComponent);




