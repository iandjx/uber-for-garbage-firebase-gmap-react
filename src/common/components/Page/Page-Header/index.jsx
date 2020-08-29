import styled from 'styled-components';

const PageHeader = styled.div`

    
     height: auto;
     padding: 0 1rem;
     position: fixed;
     right: 10px;
     top: 0;
     z-index: 2;
     @media (max-width: 700px){
         text-align: center;
         box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
         background-color : #FFFFFF;
         position: relative;
         right: 0;
         top: 0;
     }
`;

export default PageHeader;