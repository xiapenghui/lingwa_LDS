import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  DatePicker,
  Select,
  Tag,
  Table,
  Row,
  Col,
  Card,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import moment from "moment";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import globalConfig from "../../../../config/defaultSettings";
import "./components/common.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDepartement,
  postListInit,
  getArea,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from "@/services/search/lineOee";
import { BackgroundColor } from "chalk";

const productOeeComponent = ({ lineOee, dispatch }) => {
  const { productList, areaList, shifList } = lineOee;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [titleInfo, settitleInfo] = useState("122");

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataSum, setDataSum] = useState([]);
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      title: "班次",
      dataIndex: "shiftid",
      align: "center",
      width: 100,
      fixed: "left",
      render: (text, action) => {
        if (action.shiftid == 0) {
          return (text = "-");
        }
      },
    },

    {
      title: "时间段",
      dataIndex: "hourid",
      align: "center",
      width: 100,
      fixed: "left",
    },

    {
      title: "线体",
      dataIndex: "lineid",
      align: "center",
      width: 100,
    },

    {
      title: "ot",
      dataIndex: "ot",
      align: "center",
      width: 100,
    },

    {
      title: "ut",
      dataIndex: "ut",
      align: "center",
      width: 100,
    },

    {
      title: "dt",
      dataIndex: "dt",
      align: "center",
      width: 100,
    },

    {
      title: "产量",
      dataIndex: "goodparts",
      align: "center",
      width: 100,
    },


    {
      title: "日期",
      dataIndex: "tsdate",
      align: "center",
      width: 100,
    },

    {
      title: "目标KE",
      dataIndex: "targetke",
      align: "center",
      width: 100,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "目标IE",
      dataIndex: "targetie",
      align: "center",
      width: 100,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "KS",
      dataIndex: "ks",
      align: "center",
      width: 100,
      render: (text) => {
        return parseInt(text * 100) + "%";
      },
    },

    {
      title: "spt",
      dataIndex: "spt",
      align: "center",
      width: 100,
    },

    {
      title: "npv",
      dataIndex: "npv",
      align: "center",
      width: 100,
    },

    {
      title: "downtimeid",
      dataIndex: "downtimeid",
      align: "center",
      width: 100,
    },

    {
      title: "tepmleteid",
      dataIndex: "tepmleteid",
      align: "center",
      width: 100,
    },

    {
      title: "目标产量",
      dataIndex: "targetparts",
      align: "center",
      width: 120,
    },

    {
      title: "sdtp",
      dataIndex: "sdtp",
      align: "center",
      width: 120,
    },

    {
      title: "rot",
      dataIndex: "rot",
      align: "center",
      width: 120,
    },

    {
      title: "t0",
      dataIndex: "t0",
      align: "center",
      width: 100,
      render: (text) => {
        let color = text < 0 || text != 0 ? "red" : "green";
        if (text < 0 || text != 0) {
          return <Tag color={color}>{text}</Tag>;
        } else {
          return <span> {text}</span>;
        }
      },
    },

    {
      title: "t1",
      dataIndex: "t1",
      align: "center",
      width: 100,
    },

    {
      title: "t2",
      dataIndex: "t2",
      align: "center",
      width: 100,
    },

    {
      title: "t3",
      dataIndex: "t3",
      align: "center",
      width: 100,
    },

    {
      title: "t4",
      dataIndex: "t4",
      align: "center",
      width: 100,
    },

    {
      title: "t5",
      dataIndex: "t5",
      align: "center",
      width: 100,
    },
  ];

  const getColumns = () => [
    {
      title: "时间从",
      dataIndex: "tsdateStart",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "时间至",
      dataIndex: "tsdateEnd",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "班次",
      dataIndex: "shiftid",
      valueType: "text",
      align: "center",
      width: 120,
      fixed: "left",
      // hideInTable: true,
      valueEnum: shifList.length == 0 ? {} : shifList,
      initialValue: ["早班"],
      // initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(shifList)) {
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
    },

    {
      title: "时间段",
      dataIndex: "hourid",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "线体",
      dataIndex: "lineid",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "ot",
      dataIndex: "ot",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "ut",
      dataIndex: "ut",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "dt",
      dataIndex: "dt",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "产量",
      dataIndex: "goodparts",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "日期",
      dataIndex: "tsdate",
      align: "center",
      width: 100,
      hideInSearch: true,
    },
 

    {
      title: "目标KE",
      dataIndex: "targetke",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "目标IE",
      dataIndex: "targetie",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "KS",
      dataIndex: "ks",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return parseInt(text * 100) + "%";
      },
    },

    {
      title: "spt",
      dataIndex: "spt",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "npv",
      dataIndex: "npv",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "downtimeid",
      dataIndex: "downtimeid",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "tepmleteid",
      dataIndex: "tepmleteid",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "目标产量",
      dataIndex: "targetparts",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "sdtp",
      dataIndex: "sdtp",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "rot",
      dataIndex: "rot",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "t0",
      dataIndex: "t0",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 || text != 0 ? "red" : "green";
        if (text < 0 || text != 0) {
          return <Tag color={color}>{text}</Tag>;
        } else {
          return <span> {text}</span>;
        }
      },
    },

    {
      title: "t1",
      dataIndex: "t1",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t2",
      dataIndex: "t2",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t3",
      dataIndex: "t3",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t4",
      dataIndex: "t4",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t5",
      dataIndex: "t5",
      align: "center",
      width: 100,
      hideInSearch: true,
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
      PageSize: 10000,
    });
    return TableList.then(function (value) {
      setDataSum(value.list.sum);
      setDataList(value.list.detail);
      return {
        data: value.list.detail,
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
    try {
      let data = await addPost({ data: fields });
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
    console.log("handleUpdate", fields);
    try {
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
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
        data: selectedRows.map((row) => row.customer),
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
          shiftname: dataList[i].shiftname,
          productarea: dataList[i].productarea,
          tsdate: dataList[i].tsdate,
          ut: dataList[i].ut,
          dt: dataList[i].dt,
          ot: dataList[i].ot,
          ts: dataList[i].ts,
          OEE: parseInt(dataList[i].OEE * 100) + "%",
          ie: parseInt(dataList[i].ie * 100) + "%",
          targetke: parseInt(dataList[i].targetke) + "%",
          targetie: parseInt(dataList[i].targetie) + "%",
          ks: parseInt(dataList[i].ks * 100) + "%",
          gap: dataList[i].gap,
          planot: dataList[i].planot,
          rot: dataList[i].rot,
          relax: dataList[i].relax,
          lend: dataList[i].lend,
          borrow: dataList[i].borrow,
          lbot: dataList[i].lbot,
          t0: dataList[i].t0,
          t1: dataList[i].t1,
          t2: dataList[i].t2,
          t3: dataList[i].t3,
          t4: dataList[i].t4,
          t5: dataList[i].t5,
          goodparts: dataList[i].goodparts,
          targetparts: dataList[i].targetparts,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "产品族OEE查询";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "shiftname",
          "productarea",
          "tsdate",
          "ut",
          "dt",
          "ot",
          "ts",
          "OEE",
          "ie",
          "targetke",
          "targetie",
          "gap",
          "ks",
          "planot",
          "rot",
          "relax",
          "lend",
          "borrow",
          "lbot",
          "t0",
          "t1",
          "t2",
          "t3",
          "t4",
          "t5",
          "goodparts",
          "targetparts",
        ],
        sheetHeader: [
          "班次",
          "产品族",
          "日期",
          "UT",
          "DT",
          "OT",
          "TS",
          "OEE",
          "IE",
          "目标ke",
          "目标ie",
          "KS",
          "gap",
          "排班",
          "工作时间",
          "休假",
          "借入",
          "借出",
          "领班T4",
          "t0",
          "t1",
          "t2",
          "t3",
          "t4",
          "t5",
          "产量",
          "目标产量",
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <PageContainer>
      <ProTable
        tableExtraRender={(_, data) => (
          <>
            <Card>
              <Table
                title={() => (
                  <span style={{ fontSize: "17px" }}>
                    列表求和
                    <span
                      style={{
                        color: "red",
                        fontSize: "15px",
                        marginLeft: "10px",
                      }}
                    ></span>
                  </span>
                )}
                scroll={{ x: 2500, y: 400 }}
                rowSelection={{}}
                columns={columns}
                dataSource={dataSum}
                pagination={false}
              />
            </Card>
          </>
        )}
        headerTitle={
          <>
            <span>查询表格</span>
            <span
              style={{ color: "red", fontSize: "16px", marginLeft: "10px" }}
            ></span>
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
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
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
          rowKey="row"
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
            rowKey="row"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ lineOee }) => ({ lineOee }))(productOeeComponent);
