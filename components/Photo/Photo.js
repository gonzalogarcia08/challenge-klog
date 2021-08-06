/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import styled from "styled-components";

const Photo = ({ index, link }) => {
  return (
    <Wrapper
      style={{
        gridColumn: index % 2 == 0 ? 2 : 1,
        gridRow: index > 2 ? 2 : 1,
      }}
    >
      <Header>
        <Image src={link} alt="photo" />
      </Header>
    </Wrapper>
  );
};

Photo.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default Photo; 

const Wrapper = styled.div``;

const Header = styled.div``;

const Image = styled.img``;
