import React, { useState } from "react";
import { Card, Col, Row, Table } from "antd";
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
    title: "人数",
    dataIndex: "LineCountPeople",
    key: "LineCountPeople",
  },
  {
    title: "成员",
    dataIndex: "PartsWorker",
    key: "PartsWorker",
  },
];

const Components = ({ classPlan, dispatch }) => {
  const { TableList } = classPlan;
  const dataSource = TableList;

  return (
    <PageContainer>
      <div className="homeBox">
        <div style={{ width: "100%", background: "#fff" }}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </PageContainer>
  );
};

export default connect(({ classPlan }) => ({ classPlan }))(Components);
