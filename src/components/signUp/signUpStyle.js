import styled from 'styled-components'

export const ContainerSignUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  margin-top: 50px;
`
export const ContainerHeadButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`
  //border-color: #7f99aa;
export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5% 5% 1%;
  background-color: ${
    props => props.theme.primaryColor
  };
  border-color: ${
    props => props.theme.secondaryColor
  };
  border-style: solid;
  border-radius: 25px;
`
export const MiniContainer = styled.div`
  background-color: #f0efeb;
  height: auto;
  width: auto;
`
  //background-image: url("https://wallpaperaccess.com/full/1338378.jpg");
//background-image: url("https://blog.eduonix.com/wp-content/uploads/2018/09/React-16.jpg");
export const Background = styled.body`
  display: flex;
  background-image: url("https://res.cloudinary.com/keystone-demo/image/upload/v1565129461/sucpd5njo7ukftgqpscc.jpg");
  justify-content: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`
export const FormAlert = styled.p`
  color: red;
`
