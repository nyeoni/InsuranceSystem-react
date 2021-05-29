import React from 'react';
import 'antd/dist/antd.css';
import {PageHeader, Descriptions, Upload, Button,} from 'antd';
import styled from "styled-components";

const MyContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`

// TODO : file 어케할건지
const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: '인수정책 수립 ver1.0.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
        },
        {
            uid: '2',
            name: 'HM보험회사 자동차보험 기획.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },
    ],
};

export const Detail = ({board}) => {
    return(
        <MyContainer>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                style={{marginTop: "40px"}}
                title={board.title}
            >
                <Descriptions size="small" column={8}>
                    {/*<Descriptions.Item label=""></Descriptions.Item>*/}
                    <Descriptions.Item label="작성자">{board.author}</Descriptions.Item>
                    <Descriptions.Item label="작성일">{board.date}</Descriptions.Item>
                </Descriptions>
            </PageHeader>


            <hr/>
            <div style={{borderBottom: "1px solid rgba(0, 0, 0, 0.1)", paddingBottom: "1rem", marginBottom: "1rem", whiteSpace: "pre-wrap"}}>
                {board.content}
            </div>

            <Upload {...props}></Upload>
            <hr/>
            <Button style={{float: "right"}} variant="contained" onClick={() => window.history.back()}>목록</Button>
        </MyContainer>
    );
}