import React, { useState } from "react";
import { Card, Col, Row, Table } from "antd";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
const spanStyle = {
  color: "green",
  fontSize: "28px",
  marginRight: "15px",
  fontWeight: "bold",
};

const columns = [
  {
    title: "产线",
    dataIndex: "LineName",
    key: "LineName",
  },
  {
    title: "需求量(日)",
    dataIndex: "Requirement",
    key: "Requirement",
  },
  {
    title: "班次数(日)",
    dataIndex: "ShiftNums",
    key: "ShiftNums",
  },
  {
    title: "班次详情",
    dataIndex: "ShiftDetails",
    key: "ShiftDetails",
  },
  {
    title: "需求人数",
    dataIndex: "PeopleRequire",
    key: "PeopleRequire",
  },
];

const Components = ({ demandPlan, dispatch }) => {
  const { TableList } = demandPlan;
  const dataSource = TableList;
  var newHopeNum = 0;
  var newPeopleRequire = 0;
  var newShiftNums = 0;
  TableList.map((item) => {
    newHopeNum += item.Requirement;
    newPeopleRequire += item.PeopleRequire;
    newShiftNums += item.ShiftNums;
  });

  const test = (val) => {
    debugger;
  };

  return (
    <PageContainer>
      <div className="homeBox">
        <div className="handBox">
          <Row gutter={16}>
            <Col span={6}>
              <Card title="需求量" bordered={false}>
                <span style={spanStyle}>{newHopeNum}</span>PCS
              </Card>
            </Col>
            <Col span={6}>
              <Card title="需求人数" bordered={false}>
                <span style={spanStyle}>{newPeopleRequire}</span>人
              </Card>
            </Col>
            <Col span={6}>
              <Card title="批次量" bordered={false}>
                <span style={spanStyle}>{newShiftNums}</span>班
              </Card>
            </Col>
            <Col span={6}>
              <Card title="可用人数" bordered={false}>
                <span style={spanStyle}>0</span>人
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ width: "100%", background: "#fff", marginTop: "20px" }}>
          <Table
            onRow={(record) => {
              return {
                onClick: (event) => {
                  test(record);
                }, // 点击行
              };
            }}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ demandPlan }) => ({ demandPlan }))(Components);
