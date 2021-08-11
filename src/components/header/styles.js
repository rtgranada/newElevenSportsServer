import styled from 'styled-components'

export const Container = styled.div`
  height: 10vh;

  background: ${(props) => props.theme.colors.primary};
  transition: 1s;

  nav {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    /* background: #fff; */
    justify-content: space-between;
    color: #111;
  }

  nav ul {
    list-style: none;
    padding: 0px 10px;
    margin: 10px 0px;
  }

  nav ul li a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
    transition: 1s;
  }

  nav ul li {
    display: inline-block;
    margin-left: 10px;
    color: ${(props) => props.theme.colors.text};
    transition: 1s;
  }

  nav ul:first-of-type li:first-of-type {
    font-weight: bold;
    font-size: 2.1rem;
  }

  .animateIcon {
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    z-index: 4;
    &:hover,
    :focus {
      font-size: 1.5rem;
      transition: 0.8s;
    }
    &:not(:hover) {
      transition: 0.8s;
      font-size: 1rem;
    }
  }
`
