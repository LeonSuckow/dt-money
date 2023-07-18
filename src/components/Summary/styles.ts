import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -6.5rem;

  div{
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);
    transition: 0.4s background-color ease;
    header{
      display:flex;
      align-items:center;
      justify-content: space-between;
    }

    strong{
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background-red{
      background-color: var(--red);
      color: #fff
    }

    &.highlight-background-green{
      background-color: var(--green);
      color: #fff
    }
  }
`;