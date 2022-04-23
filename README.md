# Clone_And_Customizing
### 1.0 _ Vanilla JS 와 MVC 패턴을 이용한 운동어플
https://cskim999.github.io/Customizing-WorkoutApp.Project/


## App Customizing&Clone Mini project

> ## 시작하기에 앞서...
> 
> 기존에 제가 사용하던 운동앱 을 원하는대로 필요하다고 생각한 부분은 더하고 필요없다고 생각하던 부분은 제거하여 재구성하고자 합니다. 
참고한 앱에서는 오직 디자인과 기능만을 참고하고 코드의 구현은 모두 직접 구현하였습니다.
현재는 Vanilla JS 를 시작으로 추후에는 MongoDB & Redux, 그리고 React 를 사용한 버전으로의 재구성도 계획하고 있습니다.


* * *
* * *

> ## Why?
> 저는 성장하는 데 있어 무언가를 직접 만들며 고민하고 문제를 해결하는 과정이 가장 빠르고, 효과적이라고 생각합니다. 그래서 이전 Python 비트코인 변동성돌파 알고리즘 자동매매 프로그램에 이어, 또 다른 JS 기반 프로젝트를 수행하고자 했습니다.
> ## What?
>   흔히들 구현하는 여러 프로젝트 중 Todo-List, Clock&Timer, Calendar 등을 한가지 기능만을 수행하는 프로젝트는 저에게 그저 포트폴리오 구색갖추기에 불과하다는 생각에 큰 동기부여를 느끼지 못했습니다.
>   
>   따라서 실제로 사용이 가능한 수준의 완성도 있는 프로젝트를 오직 Vanilla JS 와 CSS 만을 통해 구현하고 싶었고, 실제로 제가 사용중이던 IOS 운동루틴 어플리케이션 "오늘의 운동" 의 기능과 디자인을 참고하여 모든 코드를 직접 구현해보고자 했습니다.
>   
>   그 중 구현하고자 하는 가장 핵심적 기능은 다음과 같습니다.
>   1. 나만의 운동루틴을 저장할 수 있다
>   2. 저장된 루틴을 언제든 수정할 수 있다.
>   3. 저장된 루틴을 사용하여 운동 중 매 세트 변화하는 운동 무게와 횟수를 체크할 수 있다.
>   4. 운동이 끝나면 오늘의 HistoryDB 에 오늘의 루틴 기록이 저장되어 과거 운동기록을 체크할 수 있다.
>   
>   ## How?
>   1. 아직 클라우드 DB 를 사용하지 않기에, 우선 로컬DB 를 사용하는 RoutineModel.js 를 사용
>   2. ( 1 ) 에서 구현된 RoutineModel.js의 유사 API 를 MainController 에서 호출
>   3. MainController 를 통해 원하는 RoutineData 를 WorkoutView 에 Spread
>   4. HistoryModel.js 를 구현하여 날짜 별 수행한 루틴내용을 저장, WorkoutView 의 End Button Event를 통해 해당 루틴을 HistoryModel 에 저장
>   * CSS 디자인과 더불어 Animation 효과 또한 UX 에 상당히 큰 영향을 준다고 생각하여 필수적 요소들에 Animation 요소 배치
