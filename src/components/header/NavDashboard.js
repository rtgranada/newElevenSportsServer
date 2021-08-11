import styled from 'styled-components'
import { shade, lighten } from 'polished'

export const NavDashboard = styled.div`
  height: 5vh;

  background: ${(props) => shade(0.15, props.theme.colors.primary)};
  transition: 1s;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;

  a {
    width: 100%;
    text-decoration: none;
    padding: 1rem;
    color: ${(props) => props.theme.colors.text};
    transition: 1s;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    &:hover {
      background: ${(props) => shade(0.35, props.theme.colors.primary)};
      color: ${(props) => lighten(0.35, props.theme.colors.text)};
      transition: 0.5s;
    }
  }

  .active {
    background: ${(props) => shade(0.55, props.theme.colors.primary)};
    color: ${(props) => lighten(0.55, props.theme.colors.text)};
    transition: 0.5s;
    border-radius: 0 0 15px 15px;
  }

  a:first-of-type.active {
    border-radius: 0 0 15px 0;
  }

  a:last-of-type.active {
    border-radius: 0 0 0 15px;
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
