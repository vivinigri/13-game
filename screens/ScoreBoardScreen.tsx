import React from "react";
import { ScrollView, Text, StyleSheet, FlatList } from "react-native";
import { DataTable } from "react-native-paper";

const PLAYERS = ["Vivian", "Sarita", "Flávio", "Debora"];

export type TitleProps = {
  player: string;
};

export type CellProps = {
  score: string;
};

const TableTitle: React.FC<TitleProps> = ({ player }) => {
  return (
    <DataTable.Cell style={styles.title}>
      <Text style={styles.titleText}>{player}</Text>
    </DataTable.Cell>
  );
};

const TableCell: React.FC<CellProps> = ({ score }) => {
  return (
    <DataTable.Cell style={styles.title}>
      <Text style={styles.cellText}>{score}</Text>
    </DataTable.Cell>
  );
};

const ScoreBoardScreen = () => {
  return (
    <ScrollView>
      <DataTable style={styles.dataTable}>
        <DataTable.Row>
          <FlatList
            horizontal={true}
            data={PLAYERS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <TableTitle player={item} />}
          />
        </DataTable.Row>
        <DataTable.Row>
          <TableCell score="13" />
          <TableCell score="10" />
          <TableCell score="10" />
          <TableCell score="-3" />
        </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataTable: {
    backgroundColor: "pink",
    flex: 1
  },
  title: {
    flex: 1,
    marginHorizontal: 30
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    flex: 1
  },
  cellText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    flex: 1
  }
});

export default ScoreBoardScreen;
