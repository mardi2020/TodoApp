# TypeScript 가이드<br>
> typescript는 javascript에 자료형을 명시한 것이다. <br>
[TypeScript](https://www.typescriptlang.org/docs/)
```typescript
   function func(userID : number) {
   // userID은 숫자 자료형
   }
```
## TypeScript 설치 방법<br>
```
npm install -g typescript
```
## TypeScript 기본 자료형 <br>
* boolean : true / false <br>
    ```typescript
    const active : boolean = true;
    ```
* number : 10진, 16진, 2진, 8진 literal<br>
    ```typescript
    const decimal: number = 9;
    const hex: number = 0xf00d;
    const binary: number = 0b1010;
    const octal: number = 0o744;
    ```
* string : 텍스트 형태의 데이터를 저장하는 데 사용<br>
* Array : 복잡한 자료형을 사용할 경우 두 번째 방법 사용<br>
  ```typescript
  // type[]
  const firstArray: number[] = [1, 2, 3];
  // Array<type>
  const secondArray: number[] = [4, 5, 6];
  ```
  ```typescript
  // label, value 속성을 가진 객체의 배열을 인수로 받는 함수
  function exapmle(arg: Array<{label: string, value : string}>){
    dosomething;
  }
  ```
* object <br>
  ```typescript
  function greetUser(user : {name : string, age : number}) {
    console.log(`hello ${user.name}`);
  }
  greetUser({name : 'Alberto', age : 27});
  ```
* tuple <br>
  ```typescript
  let myTuple : [string, number, string];
  myTuple = ['hi', 5, 'hello'];
  
  console.log(myTuple);
  ```
* enum : 열거형<br>
  ```typescript
  enum Status {deleted, pending, active}; // 0, 1, 2
  const blogPostStatus: Status = Status.active;
  
  console.log(blogPostStatus); // 2
  ```
  다음과 같이 시작 값을 지정해 열거 자료형 숫자를 원하는 값부터 할당 가능
  ```typescript
  enum Status {deleted = -1, pending, active}; // -1, 0, 1
  const blogSpotStatus: Status = Status.active;
  console.log(blogSpotStatus); // 1
  console.log(Status[0]); // pending
  ```
* any : 특정 변수의 값이 무엇이든 될 수 있음을 의미함 <br>
  ```typescript
  let firstUser: Object<any> = {
    name: 'Alberto',
    age: 27,
  };
  
  let secondUser: Object<any> = {
    name: 'Caroline',
  };
  ```
* void : 자료형이 없음을 의미, void 자료형의 변수를 선언할 때는 null과 undefined만 할당 가능<br>
  ```typescript
  function storeValueInDatabase(objectToStore): void {
    // 데이터베이스에 값을 저장
  }
  ```
* null & undefined <br>
* never : 절대 발생하지 않는 값, 반환을 아예 안하거나 항상 오류를 발생시키는 함수에 적용<br>
    ```typescript
    function throwError(error : string): never {
        throw new Error(error);
    }
    ```
## 인터페이스와 클래스
* 인터페이스 : 해당 변수가 가져야 하는 형태를 정의할 수 있음
    ```typescript
    Array<{label: string, value: string}>
  
    // 변수의 형태가 더 복잡해서 여러 곳에서 재사용해야 할 경우 -> 인터페이스 사용
    interface Car {
        readonly wheels: number; // readonly 키워드로 특정 속성을 편집할 수 없게 할 수 있음
        color: string;
        brand: string;
        coupe?: boolean; // 선택적 속성 
    }
    ```
  인터페이스를 사용하여 객체뿐만 아니라 함수의 형태도 정의 가능<br>
  함수가 가져야 할 형태를 인터페이스로 만든 후, 해당 인터페이스를 자료형으로 가지는 변수를 정의<br>
  그 변수에 정해진 형태의 함수를 만들어 할당함<br>
  만약 다른 형태의 함수를 해당 변수에 할당하면 오류가 발생할 것임
    ```typescript
    interface Greet {
        (greeting : string, name: string): string
    }
  
    let greet: Greet;
  
    greet = (greeting: string, name: string): string => {
        console.log(`${greeting} ! ${name}`);
        return `${greeting} ! ${name}`;
    }
    greet('Hello', 'World');
    ```
* 인터페이스 확장 : 인터페이스는 다른 인터페이스를 상속받을 수 있다.<br>
    ```typescript
    interface Vehicle{
        wheels: number;
        color: string;
    }
    interface Airplane extends Vehicle {
        wings: number;
        rotors: number;
    } // 새롭게 정의된 속성과 상속받은 두 속성을 포함하여 총 4가지 속성을 가짐
    ```
 * 클래스 : 프로토타입 상속을 수행해 애플리케이션에서 재사용할 수 있는 구성 요소를 만들 수 있다.<br>
   ES6와 달리, 클래스 멤버에 접근하는 권한을 설정할 수 있다. JS의 모든 클래스 멤버는 공개되어 있으므로 따로 접근을 제어할 수 없다.<br>
   (ts가 js로 트랜스파일되었다면 접근을 막을 수 없음)<br>
   #### public, protected, private
   ```typescript
   class Animal {
     protected eat = () => {
        console.log('nyam nyam');   
     };
     public sleep = () => {
        console.log('Zzzzz...');
     };
   } 
   
   class Human extends Animal {
      public work = () => {
        console.log('zzz');
      };
   }
   const me = new Human();
   me.work(); // zzz
   ```
* 유니언 자료형과 인터섹션 자료형<br>
  1. 유니언 자료형<br>
    이 변수는 문자열일 수도 있고, 문자열 배열일 수도 있다. | 기호를 사용하여 각 자료형을 구분한다.<br>
     모든 자료형의 유니언의 공통 속성에만 접근할 수 있다.
        ```typescript
        const attendee = string | string[];
        const identifier = string | number | string[];
        ```
       ```typescript
       interface Kid {
        age: number;
       }
      interface Adult {
        age: number;
        job: string;
      }
      function person(): Kid | Adult {
        return  {age: 27};
      }
  
      const me = person();
      me.age // 접근 가능
      me.job // error
       ```
  2. 인터섹션 자료형<br>
    여러 자료형을 결합할 수 있다. <br>
     아래 예제에서는 Person과 Worker 자료형을 결합하여 Adult 자료형을 만들었다.<br>
     두 인터페이스가 각각 자료형은 다르지만 동일한 이름의 속성을 가지면 두 인터페이스를 결합할 때 컴파일러 오류가 발생한다.
     ```typescript
     interface Person {
        sex: 'male' | 'female' | 'N/A';
        age: number;
     }
     interface Employee {
        job: string;
     }
     
     type Adult = Person & Employee;
     
     const me: Adult = {
        sex: 'male',
        age: 27,
        job: 'software developer',
     };
     console.log(me); // {sex: 'male', age: 27, job: 'software developer'}
     ```