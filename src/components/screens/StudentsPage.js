import React from "react";
import styled from "styled-components";

const StudentsPage = () => {
  return (
    <Container>
      <PageTitle>Our Students</PageTitle>
      <ProjectDescription>
        The Smart Campus project brings together students from different
        faculties in the college to produce a creative and innovative product.
      </ProjectDescription>
      <FacultySection>
        <FacultyTitle>Faculty of Engineering</FacultyTitle>
        <StudentList>
          <StudentItem>
            <StudentPhoto
              src="https://i.imgur.com/NNDd6h8.png"
              alt="Student photo"
            />
            <StudentInfo>
              <StudentName>John Doe</StudentName>
              <StudentTeam>Team A</StudentTeam>
            </StudentInfo>
          </StudentItem>
          <StudentItem>
            <StudentPhoto
              src="https://i.imgur.com/FDWo9.jpeg"
              alt="Student photo"
            />
            <StudentInfo>
              <StudentName>Jane Smith</StudentName>
              <StudentTeam>Team B</StudentTeam>
            </StudentInfo>
          </StudentItem>
          {/* Add more students */}
        </StudentList>
      </FacultySection>
      <FacultySection>
        <FacultyTitle>Faculty of Arts</FacultyTitle>
        <StudentList>
          <StudentItem>
            <StudentPhoto
              src="https://i.imgur.com/yqa5OAD.jpeg"
              alt="Student photo"
            />
            <StudentInfo>
              <StudentName>Bob Johnson</StudentName>
              <StudentTeam>Team C</StudentTeam>
            </StudentInfo>
          </StudentItem>
          <StudentItem>
            <StudentPhoto
              src="https://i.imgur.com/hNl0nhz.png"
              alt="Student photo"
            />
            <StudentInfo>
              <StudentName>Samantha Lee</StudentName>
              <StudentTeam>Team A</StudentTeam>
            </StudentInfo>
          </StudentItem>
          {/* Add more students */}
        </StudentList>
      </FacultySection>
      {/* Add more faculty sections */}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;
const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FacultySection = styled.section`
  margin-top: 40px;
`;

const StudentList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StudentItem = styled.li`
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  }
`;

const StudentPhoto = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StudentName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const StudentTeam = styled.p`
  font-size: 16px;
  margin: 0;
  text-align: center;
`;

const FacultyTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export default StudentsPage;
