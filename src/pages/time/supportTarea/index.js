import {
  PlusOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button, message, DatePicker, Select, Input, Table } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import moment from "moment";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ImportExcel from "./components/ImportExcel";
import "../../../../src/assets/commonStyle.css";
import globalConfig from "../../../../config/defaultSettings";
import ExportJsonExcel from "js-export-excel";
import {
  getDepartement,
  postListInit,
  getArea,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/time/supportTarea";

const supportInputComponent = ({ supportTarea, dispatch }) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    lineList,
    redList,
    timeaxisList,
  } = supportTarea;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [importModalVisible, handleImportModalVisible] = useState(false);

  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  // const [areaList, setareaList] = useState([]);

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataList, setDataList] = useState([]);
  const getColumns = () => [
    {
      title: "部门",
      dataIndex: "departmentid",
      valueType: "text",
      align: "center",
      valueEnum: departmentList.length == 0 ? {} : departmentList,
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.departmentid
        ? UpdateDate.departmentid.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(departmentList)) {
            newList.push({ key: key, label: value.text });
          }
          return (
            <Select allowClear showSearch optionFilterProp="children">
              {newList.map(function (item, index) {
                return (
                  <Select.Option key={index} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          );
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "部门不能为空!",
          },
        ],
      },
    },

    {
      title: "日期",
      dataIndex: "tsdate",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      // initialValue: IsUpdate ? UpdateDate.date : '',
      initialValue: IsUpdate
        ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat)
        : moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form") {
          // 返回新的组件
          return (
            <DatePicker
              style={{ width: "100%" }}
              format={globalConfig.form.onlyDateFormat}
            />
          );
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "日期不能为空!",
          },
        ],
      },
    },

    {
      title: "区域",
      dataIndex: "areaid",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.areaid
        ? UpdateDate.areaid.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(areaList)) {
            newList.push({ key: key, label: value.text });
          }
          return (
            <Select allowClear showSearch optionFilterProp="children">
              {newList.map(function (item, index) {
                return (
                  <Select.Option key={index} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          );
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "区域不能为空!",
          },
        ],
      },
    },

    {
      title: "ts",
      dataIndex: "ts",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ts : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "ts不能为空!",
          },
        ],
      },
    },

    {
      title: "gap",
      dataIndex: "gap",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.gap : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "gap不能为空!",
          },
        ],
      },
    },

    {
      title: "paidhour",
      dataIndex: "paidhour",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.paidhour : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "paidhour不能为空!",
          },
        ],
      },
    },

    {
      title: "t1",
      dataIndex: "t1",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t1 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "t1不能为空!",
          },
        ],
      },
    },

    {
      title: "t4",
      dataIndex: "t4",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t4 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "t4不能为空!",
          },
        ],
      },
    },

    {
      title: "t5",
      dataIndex: "t5",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t5 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "t5不能为空!",
          },
        ],
      },
    },

    {
      title: "ke",
      dataIndex: "ke",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ke : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "ke不能为空!",
          },
        ],
      },
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setIsUpdate(true);
              setUpdateDate({ ...record });
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      departmentid: Number(params.departmentid),
      areaid: Number(params.areaid),
      tsdate: params.tsdate,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      setDataList(value.list);
      return {
        data: value.list,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
      };
    });
  };

  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading("正在添加");
    let params = {
      departmentid:
        Number(fields.departmentid) == null ? "" : Number(fields.departmentid),
      tsdate: fields.tsdate,
      areaid: Number(fields.areaid) == null ? "" : Number(fields.areaid),
      ts: fields.ts,
      gap: fields.gap,
      paidhour: fields.paidhour,
      t1: fields.t1,
      t4: fields.t4,
      t5: fields.t5,
      ke: fields.ke,
      period: fields.period,
    };
    try {
      let data = await addPost(params);
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("添加失败请重试！");
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

  const handleUpdate = async (fields) => {
    const hide = message.loading("正在编辑");
    try {
      let data = await updatePut({
        id: UpdateDate.id,
        // departmentid: Number(fields.departmentid) == null ? '' : Number(fields.departmentid),
        departmentid: Number(fields.departmentid),
        tsdate: fields.tsdate,
        areaid: Number(fields.areaid),
        ts: fields.ts,
        gap: fields.gap,
        paidhour: fields.paidhour,
        t1: fields.t1,
        t4: fields.t4,
        t5: fields.t5,
        ke: fields.ke,
      });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("编辑失败请重试！");
      hide();
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        ids: selectedRows.map((row) => row.id),
      });

      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
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
          departmentshortname: dataList[i].departmentshortname,
          tsdate: dataList[i].tsdate,
          areaname: dataList[i].areaname,
          ts: dataList[i].ts,
          gap: dataList[i].gap,
          paidhour: dataList[i].paidhour,
          t1: dataList[i].t1,
          t4: dataList[i].t4,
          t5: dataList[i].t5,
          ke: dataList[i].ke,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "部门录入信息";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "departmentshortname",
          "tsdate",
          "areaname",
          "ts",
          "gap",
          "paidhour",
          "t1",
          "t4",
          "t5",
          "ke",
        ],
        sheetHeader: [
          "部门",
          "日期",
          "区域",
          "ts",
          "gap",
          "paidhour",
          "t1",
          "t4",
          "t5",
          "ke",
        ],
      },
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  //导入文件
  // const dataInfo = {
  //   name: "file",
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   beforeUpload: file => {
  //     debugger
  //     if (
  //       file.type !== "application/vnd.ms-excel" ||
  //       file.type !==
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     ) {
  //       message.error(`${file.name} 格式不正确`);
  //     }
  //     return (file.type === "application/vnd.ms-excel" ||
  //     file.type ===
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  //       ? true
  //       : Upload.LIST_IGNORE;
  //   },
  //   onChange: (info) => {
  //     console.log(info.fileList);
  //   },
  //   beforeUpload: file => {
  //     if (file.type !== 'image/png') {
  //       message.error(`${file.name} is not a png file`);
  //     }
  //     return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
  //   },
  //   onChange: info => {
  //     console.log(info.fileList);
  //   },
   
  // };

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        pagination={false}
        rowKey="id"
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
          // <Button type="primary" onClick={() => handleImportModalVisible(true)}>
          //   <VerticalAlignBottomOutlined /> 导入
          // </Button>,
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
              已选择{" "}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{" "}
              项&nbsp;&nbsp;
              <span></span>
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
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title="新建"
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
          rowKey="id"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleUpdateModalVisible(false);
          }}
          modalVisible={updateModalVisible}
          title="编辑"
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="id"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}

      {/* <ImportExcel
        onCancel={() => handleImportModalVisible(false)}
        modalVisible={importModalVisible}
        // dataInfo={dataInfo}
      ></ImportExcel> */}
    </PageContainer>
  );
};

export default connect(({ supportTarea }) => ({ supportTarea }))(
  supportInputComponent
);
