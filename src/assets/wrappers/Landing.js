import styled from 'styled-components';

const Wrapper = styled.main`
    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }
    .page {
        min-height: calc(100vh - var(--nav-height));
        /* display: grid; */
        align-items: center;
        margin-top: 2rem;
        text-align:center;
    }
    .icon {
        font-size: 8rem;
        color: lightcoral;
    }
    h1 {
        font-weight: 700;
        span {
            color: var(--primary-500);
        }
    }
    p {
        color: var(--gray-600);
        margin: 2rem auto;
        color: lightcoral
    }
    .main-img {
        display: none;
    }
    @media (min-width: 992px) {
        .page {
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }
        .main-img {
            display: block;
        }
    }
`

export default Wrapper