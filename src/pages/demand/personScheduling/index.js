import React, { useState } from "react";
import { Card, Col, Row, Table, Space } from "antd";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";

const columns = [
  {
    title: "产线",
    dataIndex: "LineName",
    key: "LineName",
  },
  {
    title: "班次",
    dataIndex: "ShiftName",
    key: "ShiftName",
    render: (text) => {
      if (text == "1") {
        return (text = "早班");
      } else if (text == "2") {
        return (text = "中班");
      } else {
        return (text = "晚班");
      }
    },
  },
  {
    title: "当前人数",
    dataIndex: "CurrentWorker",
    key: "CurrentWorker",
  },
  {
    title: "最优人数",
    dataIndex: "OptimalWorker",
    key: "OptimalWorker",
  },
  {
    title: "成员",
    dataIndex: "PartsWorker",
    key: "PartsWorker",
  },
  // {
  //   title: "状态",
  //   dataIndex: "address",
  //   key: "address",
  // },
  // {
  //   title: "操作",
  //   dataIndex: "address",
  //   key: "address",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>删除</a>
  //     </Space>
  //   ),
  // },
];

const Components = ({ personScheduling, dispatch }) => {
  const { TableList } = personScheduling;
  const dataSource = TableList;

  return (
    <PageContainer>
      <div className="homeBox">
        <div className="handBox">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                title={
                  <>
                    <span>早班可用人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title={
                  <>
                    <span>中班班可用人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card
                extra={
                  <>
                    <a href="#" style={{ marginRight: "30px" }}>
                      释放
                    </a>
                    <a href="#">重置</a>
                  </>
                }
                title={
                  <>
                    <span>待加入人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card
                extra={<a href="#">重置</a>}
                title={
                  <>
                    <span>待撤离人员</span>
                    <span>（0）人</span>
                  </>
                }
                bordered={false}
              >
                Card content
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ personScheduling }) => ({ personScheduling }))(
  Components
);
