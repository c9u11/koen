<a name="readme-top"></a>

<!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/c9u11/koen">
    <img src="https://github.com/c9u11/koen/blob/main/public/assets/icons/png/512x512.png?raw=true" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">KoEn</h3>

  <p align="center">
    Program to convert text to Korean or English
    <br />
    <br />
    🥳 <a href="https://apps.apple.com/kr/app/koen/id6566172035?l=en-GB&mt=12">드디어 앱스토어에서 KoEn을 다운받을 수 있습니다.</a> 🤩
    <br />
    <br />
    <a href="https://c9u11.github.io/koen-page/">Homapage</a>
    ·
    <a href="https://github.com/c9u11/koen/issues">Report Bug</a>
    ·
    <a href="https://github.com/c9u11/koen/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About The Project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Project Screen Shot](https://github.com/c9u11/koen/blob/main/public/assets/screenshot.png?raw=true)

맥을 사용하며 한/영 변환이 잘 되지않아서 불편했던 경험이 많아 원하는 텍스트를 자동으로 변환해주는 프로그램을 만들었습니다. 이 프로그램이 많은 사용자에게 도움이 되었으면 좋겠습니다.

현재 사용 가능한 예시:

- 영어와 한글이 섞인 문서를 작성할 때 변환 되지 않은 텍스트를 지우지 않고 바꿀 수 있습니다.
- 영어 또는 한글로 모두 작성해야 했지만 반대로 작성했을 경우 한번에 바꿀 수 있습니다.
- 응용 프로그램의 종류와 상관없이 모든 곳에서 사용할 수 있습니다. (복사와 붙여넣기가 가능한 프로그램)

물론, 텍스트를 지우고 작성하는게 빠를 수 있습니다. 그렇기에 모든 맥 사용자에게 도움이 되는건 아닐겁니다. 하지만 기능을 추가하고 확장하다 보면 한/영 변환을 하지 않고 한국어와 영어가 섞인 글을 쓸 수 있는 날이 오지 않을까 생각합니다. 또한 맞춤법 검사기처럼 추가 기능을 개발하는 등 확장성이 뛰어납니다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

이 프로젝트는 아래의 기술 및 라이브러리를 사용하여 만들어졌습니다.

- ![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white) [Electron](https://www.electronjs.org/)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) [Typescript](https://www.typescriptlang.org/)
- <img src="http://robotjs.io/img/logo.png" height="20"></img> [RobotJS](http://robotjs.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Koen 개발에 도움을 주실 분들을 위한 콘텐츠입니다. 단순 프로그램 설치 후 사용을 원하시는 분은 홈페이지를 확인하세요.

아래는 프로젝트를 로컬로 설정하는 방법입니다. 프로젝트를 복사하고 아래의 과정을 수행하세요.

### Prerequisites

아래 항목이 설치되어 있어야 합니다.

- node

- npm

- git

### Installation

다음 과정을 거쳐 프로젝트를 설치 및 실행 할 수 있습니다.

1. Clone the repo

   ```sh
   git clone https://github.com/c9u11/koen.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Start project
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Global Shortcut 사용
- [x] Keyboard 제어 라이브러리 사용 (RobotJS)
- [x] Dragged Text 가져오기
- [x] 영어를 한글로 변환
- [x] 한글을 영어로 변환
- [x] Build 테스트
- [x] 백그라운드 설정
  - [x] 앱 종료 관련 버그 수정

제안된 기능 및 알려진 이슈의 전체 목록은 [미해결 이슈](https://github.com/c9u11/koen/issues)를 참조하세요.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

프로젝트를 개선할 수 있는 제안이 있으면 fork 후 pull request를 하세요. 감사합니다.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

황석영 - tjrdud6412@naver.com

Project Link: [https://github.com/c9u11/koen](https://github.com/c9u11/koen)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
