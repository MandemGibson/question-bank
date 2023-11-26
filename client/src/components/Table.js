import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../cssModules/Table.css";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { selectResults } from "../features/resultSlice";

function createData(name, level, subject, scores, grades, type, date) {
  switch (true) {
    case scores >= 95:
      grades = "A+";
      break;
    case scores >= 90:
      grades = "A";
      break;
    case scores >= 85:
      grades = "B+";
      break;
    case scores >= 80:
      grades = "B";
      break;
    case scores >= 75:
      grades = "C+";
      break;
    case scores >= 70:
      grades = "C-";
      break;
    case scores >= 65:
      grades = "D+";
      break;
    case scores >= 60:
      grades = "D";
      break;
    case scores >= 55:
      grades = "E";
      break;
    case scores >= 50:
      grades = "F";
      break;
    default:
      grades = "F";
      break;
  }

  return {
    name,
    level,
    subject,
    scores,
    grades,
    type,
    date,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="table-body">
          {row.name}
        </TableCell>
        <TableCell align="right" className="table-body">
          {row.level}
        </TableCell>
        <TableCell align="right" className="table-body">
          {row.subject}
        </TableCell>
        <TableCell align="right" className="table-body">
          {row.scores}
        </TableCell>
        <TableCell align="right" className="table-body">
          {row.grades}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                ml="15px"
                fontFamily="Rubik"
                fontWeight="600"
                color="#6b6a6a"
              >
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-headings">Date</TableCell>
                    <TableCell className="table-headings">Type</TableCell>
                    <TableCell align="right" className="table-headings">
                      Subject
                    </TableCell>
                    <TableCell align="right" className="table-headings">
                      Scores
                    </TableCell>
                    <TableCell align="right" className="table-headings">
                      Grades
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-body"
                      >
                        {historyRow.date}
                      </TableCell>
                      <TableCell className="table-body">
                        {historyRow.type}
                      </TableCell>
                      <TableCell align="right" className="table-body">
                        {historyRow.subject}
                      </TableCell>
                      <TableCell align="right" className="table-body">
                        {historyRow.scores}
                      </TableCell>
                      <TableCell align="right" className="table-body">
                        {historyRow.grades}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    level: PropTypes.string.isRequired,
    scores: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        scores: PropTypes.number.isRequired,
        grades: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ searchFilter }) {
  const user = useSelector(selectUser);

  const results = useSelector(selectResults);
  const [studentsOfStaff, setStudentsOfStaff] = React.useState([]);

  const staffLevels = React.useMemo(() => {
    return user?.user.level.map((level) => level.name) || [];
  }, [user]);

  React.useEffect(() => {
    const filteredStudents = results.filter((student) => {
      const studentLevelName = student.student.level.name;
      return staffLevels.includes(studentLevelName);
    });

    const studentRecord = filteredStudents?.map((student) => {
      return createData(
        `${student.student.firstname} ${student.student.middlename || ""} ${
          student.student.lastname
        }`,
        student.student.level.name,
        student.title,
        student.result,
        "",
        student.category.name,
        student.createdAt.split("T")[0]
      );
    });

    const groupedRecord = studentRecord.reduce((accumulator, record) => {
      const index = accumulator.findIndex((r) => r.name === record.name);

      if (index === -1) {
        accumulator.push({
          ...record,
          history: [],
        });
      } else {
        accumulator[index].history.push(record);

        accumulator[index].history.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      }
      return accumulator;
    }, []);

    setStudentsOfStaff(groupedRecord);
  }, [results, staffLevels]);

  return (
    <TableContainer component={Paper}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          ml="20px"
          fontFamily="Rubik"
          fontWeight="600"
          color="#6b6a6a"
        >
          Individual Records
        </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="table-headings">Name</TableCell>
              <TableCell align="right" className="table-headings">
                Class
              </TableCell>
              <TableCell align="right" className="table-headings">
                Subject
              </TableCell>
              <TableCell align="right" className="table-headings">
                Scores
              </TableCell>
              <TableCell align="right" className="table-headings">
                Grades
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsOfStaff.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
