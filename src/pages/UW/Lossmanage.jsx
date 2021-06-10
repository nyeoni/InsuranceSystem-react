import React from "react";
import {Wrapper} from "../../components/Wrapper";
import {Button, Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {DataTable2} from "../../components/DataTable2";

const Lossmanage = () => {
    return (
        <Wrapper>
            {/*<Space>*/}
            {/*    <Dropdown overlay={menu}>*/}
            {/*        <Button style={{ width: 95 }}>*/}
            {/*            {option}<DownOutlined />*/}
            {/*        </Button>*/}
            {/*    </Dropdown>*/}
            {/*    <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />*/}
            {/*</Space>*/}
            {/*<DataTable2 onRow={onRow} loading={loading} dataSource={searchData} columns = {columns} title = {title}/>*/}
            {/*/!*<InfoModal visible={false}*!/*/}
        </Wrapper>
    )
}

export default Lossmanage;