import React from "react";
import { ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import styled, { withTheme } from "styled-components/native";

const SCORE_TABLE = {
  tableHead: ["", "Head1", "Head2", "Head3"],
  tableTitle: ["Title", "Title2", "Title3", "Title4"],
  tableData: [
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
    ["a", "b", "c"]
  ]
};

const ScrollViewMain = styled(ScrollView)`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`;

const RowHeader = styled(Row)`
  height: 46px;
  background-color: ${(props) => props.theme.INACTIVE_COLOR};
  text-align: center;
`;

const ColTable = styled(Col)`
  flex: 1;
  background-color: ${(props) => props.theme.QUOTED_COLOR};
  text-align: center;
`;

const RowsTable = styled(Rows)`
  height: 40px;
  text-align: center;
`;

const ScoreBoardScreen = (props) => {
  return (
    <ScrollViewMain>
      <Table
        borderStyle={{ borderWidth: 1, borderColor: props.theme.ACTIVE_COLOR }}
      >
        <RowHeader
          data={SCORE_TABLE.tableHead}
          flexArr={[1, 2, 2, 2]}
          textStyle={{
            color: props.theme.FOREGROUND_COLOR,
            fontWeight: "bold"
          }}
        />
        <TableWrapper style={{ flexDirection: "row" }}>
          <ColTable
            data={SCORE_TABLE.tableTitle}
            heightArr={[40, 40, 40, 40]}
            textStyle={{
              color: props.theme.BACKGROUND_COLOR,
              fontWeight: "bold"
            }}
          />
          <RowsTable
            data={SCORE_TABLE.tableData}
            flexArr={[2, 2, 2]}
            textStyle={{
              color: props.theme.SUPPORT_COLOR,
              fontWeight: "bold",
              fontStyle: "italic"
            }}
          />
        </TableWrapper>
      </Table>
    </ScrollViewMain>
  );
};

export default withTheme(ScoreBoardScreen);
