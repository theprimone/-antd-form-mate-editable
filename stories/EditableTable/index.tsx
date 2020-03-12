import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import moment from 'moment';
import EditableTable, { IntlProvider, enUSIntl } from '../../src';
import { EditableTableHandles } from '../../src/components/EditableTable';

const genderOptions = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];

export default () => {
  const tableRef = React.createRef<EditableTableHandles>();
  const [
    editingKey,
    setEditingKey,
  ] = useState<number | null>();
  return (
    <IntlProvider value={enUSIntl}>
      <div style={{ width: '100%', height: '100%', padding: 48 }}>
        <div style={{ width: 900, margin: '0 auto' }}>
          <EditableTable
            initialValues={{
              name: "xxx",
              gender: 1
            }}
            columns={[
              {
                title: '姓名',
                dataIndex: 'name',
                editConfig: {
                  type: 'string',
                },
              },
              {
                title: '性别',
                dataIndex: 'gender',
                editConfig: {
                  type: 'select',
                  componentProps: {
                    options: genderOptions,
                  },
                },
              },
              {
                title: '生日',
                dataIndex: 'birthday',
                render: (value) => {
                  if (value) {
                    return moment(value).format('YYYY-MM-DD');
                  }
                  return '-';
                },
                editConfig: {
                  type: 'date',
                  formItemProps: {
                    required: true,
                  }
                },
              },
            ]}
            initialData={[
              {
                id: 123,
                gender: 1,
                name: 'xys',
                birthday: null,
              },
              {
                id: 23,
                gender: 2,
                name: 'theprimone',
                birthday: null,
              },
            ]}
            onCreate={async (record) => {
              console.log('create record', record);
            }}
            onUpdate={async (record) => {
              console.log('update record', record);
            }}
            onDelete={async (record) => {
              console.log('delete record', record);
            }}
            onDataChange={(data) => {
              console.log(data);
            }}
            onCancel={(prevRecord, record) => {
              console.log(prevRecord, record);
            }}
            editingKey={setEditingKey}
            ref={tableRef}
            toolBarRender={() => {
              return [
                <Button key="sort">Sort</Button>,
              ]
            }}
            tailAdd={false}
          />
          <Divider />
          <Button
            type='primary'
            onClick={() => alert(`editingKey: ${editingKey}`)}
          >
            Alert editingKey
          </Button>
          <Button
            type='primary'
            style={{ marginLeft: 12 }}
            onClick={() => {
              if (tableRef?.current) {
                alert(`isEditing: ${tableRef.current.isEditing()}`)
              }
            }}
          >
            Alert isEditing
          </Button>
        </div>
      </div>
    </IntlProvider>
  )
}
