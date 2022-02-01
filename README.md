# Auth-Node-React

## 구현 목표

### Client (React)

-   **Setting**  
    `React + ReduxSaga + Axios`
    모든 API 요청은 Redux에서 관리.

-   **Local Auth**  
    회원가입, 로그인, 로그아웃

-   **OAuth**
    -   Kakao : 클라이언트에서 Access Token 발급후 서버 요청  
        `react-kakao-login`와 Kakaodeveloper의 JsKey를 사용해서 프론트에서 accessToken발급 후 서버에게 전송.
    -   Google:
    -   Naver :

### Server(Node)

-   **Setting**  
    `Node Express + MySQL + Prisma`

-   **Local Auth**  
    `passport` 사용

-   **Oauth**
    -   Kakao  
        `passport-custom`을 사용해서 기존 locallogin과 session 공유.  
        프론트에서 accessToken을 받으면 Middleware에서 kakaoAPi서버로 회원 정보를 받고 이후 kakao login을 위한 custom 전략을 실행.
    -   Google:
    -   Naver:  
        위 두 방식도 카카오랑 비슷한 로직으로 구현될 것 같음.

---
### proxy를 통해 서버에서 passport 전략 사용
