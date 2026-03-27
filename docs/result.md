## 🙏 소중한 과제가 올바르게 제출되었는지 한번 더 확인해주세요 🙏

- [x] 테스트가 모두 통과했나요?
- [x] 필수 요구사항을 모두 충족시켰나요?
- [x] 깃헙 저장소가 공유됐나요?
- 제출하시는 PR이 어떤 PR인지 선택해주세요.
  - [ ] 이 PR은 `기능구현 PR` 입니다.
  - [x] 이 PR은 `리팩토링 PR` 입니다.

## 😊 과제 평가자에게 하고 싶은 말

이번 리팩토링은 **Frontend Fundamentals**의 원칙들을 기반으로, 두 개의 대형 페이지 컴포넌트(`ReservationStatusPage`, `RoomBookingPage`)를 역할 단위로 분리하고, 비동기 처리의 선언적 패턴을 적용하는 데 집중했습니다.

특히 신경 쓴 부분은 다음과 같습니다:

1. **컴포넌트 분리 기준**: 같이 실행되지 않는 코드를 분리한다는 기준으로 컴포넌트를 나누었습니다.

2. **폴더 분리 기준**: 관련 파일끼리 가까이 위치하도록 구성하여 코드가 수정될때 가까이서 수정될 수 있도록 구조를 잡았습니다.

3. **파일 분리 기준**: 사용처가 여러 곳일 때만 별도 파일로 분리했습니다. Fallback/Error 컴포넌트는 사용하는 파일 내에 함께 정의하고, 훅이나 상수도 한 곳에서만 사용된다면 해당 파일에 두었습니다.

4. **예측 가능한 코드**: 커스텀 훅의 반환값을 반환값이 하나뿐이더라도 객체 형태(`{ value }`)로 통일했습니다.

5. **Suspense + ErrorBoundary 조합**: `useSuspenseQuery`를 적용하여 로딩/에러 상태를 컴포넌트 밖으로 끌어올리고, 각 비동기 경계마다 `ErrorBoundary`와 전용 에러 fallback을 배치하여 부분적 에러 복구가 가능하도록 했습니다.

6. **필터 상태를 URL params로 직접 구동**: `RoomBookingPage`에서 `useState`로 관리하던 필터 상태를 URL search params로 직접 대체했습니다. 6개의 개별 URL param 훅(`useDateParam`, `useStartTimeParam` 등)을 만들어 각 컴포넌트가 자기 param만 직접 읽고 쓰도록 하여 prop drilling을 제거하고, 양방향 동기화 훅(`useBookingFilterSync`)을 삭제했습니다. (토스 펀더먼탈: 책임을 하나씩 관리하기)

7. **테스트 안정성**: `MemoryRouter` 환경에서의 URL 파라미터 동기화를 `useSearchParams` 기반으로 구현했습니다.

8. **deprecated API 정리**: `invalidateQueries`의 object argument 방식 전환, `isLoading` → `isPending` 전환 등 TanStack Query v4의 deprecated API를 최신 권장 방식으로 수정했습니다.

## 💭 아래는 과제 제출 후에 자유롭게 작성해주세요

**과제를 수행하는데 어려움은 없었나요?**

1. `useSuspenseQuery`가 `enabled` 옵션을 지원하지 않아서, 필터가 불완전한 상태에서 API 호출이 발생하는 문제가 있었습니다. 방어적 API 함수(빈 date일 때 빈 배열 반환)로 해결했습니다.
2. Zustand 스토어가 모듈 레벨 싱글톤이라 테스트 간 상태가 누수되는 문제가 있었습니다. `vitest.setup.ts`에서 `afterEach`로 모든 스토어를 초기화하여 해결했습니다.
3. React 17 환경에서 `react-error-boundary` v6(peer dep React 18+)를 사용하는데, 실제 동작에는 문제가 없었지만 향후 호환성 주의가 필요합니다.

**좋았던 점 / 아쉬웠던 점 / 제안하고 싶은 점**

1. 좋았던 점: 리팩토링 전후로 기존 테스트 20개가 모두 통과하여, 동작 변경 없이 구조만 개선할 수 있었습니다.
2. 아쉬웠던 점: React 17 환경이라 Suspense의 SSR 지원이나 `useTransition` 등 React 18의 Concurrent 기능을 활용하지 못한 점이 아쉽습니다.
3. 제안하고 싶은 점: React 18로 업그레이드하면 `useSuspenseQuery`의 `skipToken` 지원, Suspense SSR 등 더 선언적인 비동기 처리가 가능해질 것 같습니다.

**제출하는 PR이 `리팩토링 PR`인 경우, 어떤 부분에 초점을 맞춰서 리팩토링했는지 설명해주세요.**

1. **대형 컴포넌트 분리**: `ReservationStatusPage`(300줄+)와 `RoomBookingPage`(450줄+)를 역할 단위 컴포넌트로 분리하여 각 파일이 하나의 관심사만 담당하도록 했습니다.
2. **선언적 비동기 처리**: `useQuery` + 수동 로딩/에러 분기를 `useSuspenseQuery` + `Suspense` + `ErrorBoundary` 조합으로 전환하여, 비동기 상태 처리를 컴포넌트 트리 구조로 선언했습니다.
3. **상태 관리 개선**: `RoomBookingPage`의 필터 상태를 URL search params 기반 개별 훅으로 전환하여 prop drilling을 제거하고, 동기화 레이어(`useBookingFilterSync`) 없이 각 컴포넌트가 자기 URL param을 직접 소유하도록 했습니다.
4. **파일 구조 정리**: 단일 사용처 상수(`HOUR_LABELS`, `ALL_EQUIPMENT`)를 해당 사용처로 이동하고, 관련 컴포넌트를 폴더로 그룹화(`RoomCardList/`, `MyReservationBody/`)하여 코드 응집도를 높였습니다.
5. **deprecated API 정리**: TanStack Query의 deprecated 시그니처(`invalidateQueries` positional args, `isLoading`)를 최신 권장 방식으로 수정했습니다.
