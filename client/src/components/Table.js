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
import { selectStudents, fetchStudents } from "../features/studentSlice";
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function createData(name, level, subject, scores, grades) {
  switch (true) {
    case scores >= 70:
      grades = "A";
      break;
    case scores >= 60:
      grades = "B";
      break;
    case scores >= 50:
      grades = "C";
      break;
    case scores >= 40:
      grades = "D";
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
    history: [
      {
        date: "2023-09-22",
        type: "Quiz",
        subject: subject,
      },
      {
        date: "2023-09-21",
        type: "Examination",
        subject: subject,
      },
    ],
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
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
                        {row.scores}
                      </TableCell>
                      <TableCell align="right" className="table-body">
                        {row.grades}
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
        subject: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    grades: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const students = useSelector(selectStudents);

  React.useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const studentsOfStaff = students?.filter((student) => {
    return user.user.level.includes(student.level);
  });

  console.log(user?.user.level);
  students.map((student) => console.log(student.level));
  console.log("studentsOfStaff:", studentsOfStaff);

  // const student = studentsOfStaff.map((stu) => {
  //   return {
  //     name: `${stu.firstname} ${stu.middlename || null} ${stu.lastname}`,
  //     level: stu.level.name,
  //   };
  // });

  // const rows = [
  //   createData(student.name, student.level, "English", 90),
  // createData("Prince Acheampong", "Jhs 3", "English", 81, "", 4.99),
  // createData("Georgina Cobbinah", "Jhs 2", "English", 67, "", 3.79),
  // createData("Deseret Mensah", "Jhs 1", "English", 94, "", 2.5),
  // createData("Joel Brempong", "Jhs 3", "English", 50, "", 1.5),
  // ];
  let rows = [];
  rows = studentsOfStaff?.map((student) => {
    return createData(
      `${student.firstname} ${student.middlename || ""} ${student.lastname}`,
      student.level.name,
      "English",
      90
    );
  });

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
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
