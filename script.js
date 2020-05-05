

//Коструктор контроля доступа для работы с электрозамками, турникетами, шлагбаумами

let Controller = function(time) {
    let lock = 'close';
    time = time || 5000;  // время задержки закрытия замка
    
    this.get = function(button) {
        this.button = button || 'off';   //кнопка выхода     
        this.openEnter();
        this.openExit();
    }; 

    this. openEnter = function() {                           //кодонаборная панель
        if(this.button == 'off') {
            let code = prompt('ВВедите код', '255552#');
            let codeVal = /^255552\#$/;
            if(codeVal.test(code) == true) {
                document.write('Код верный. Вход разрешен.');
                lock = 'open';
                this.delay();    
            } else document.write('Код набран не верно. Проход запрещен.');
        }
    }; 

    this.openExit = function() {        //кнопка выхода 
        if(this.button == 'on') {
            document.write('Выход разрешен.');
            lock = 'open';
            this.delay();   
        } 
    };

    this.delay = function() {
        setTimeout(function() {
        lock = 'close';
        alert('Дверь закрыта');
       },time)  
    };   
};

let control = new Controller(5000);

//control.get('off');       //при выключеной кнопке запрашивает код
//control.get('on');          //вкючает кнопку выхода  


// Функция-конструктор контроллера входной двери с домофоном
let DomofonControl = function() {            
    Controller.apply(this, arguments);
    this.ring = function(butttonRing) {
        butttonRing = butttonRing || 'off';         // кнопка вызова
        if(butttonRing == 'on') {
            let a = confirm('Звонок! Открыть дверь?');
            if(a == true) {
                document.write('Вход разрешен.');
                lock = 'open';
                this.delay();   
            }                   
        }
    }
    this.blockoff = function(fire) {    // кнопка аварийной разблокировки двери
        fire = fire || 'disable';
        if(fire == 'enable') {
            alert('Внимание! Дверь открыта принудительно!');
            lock = 'open';
            }
    }
};

let door = new DomofonControl(10000);
//door.ring('on'); 
//door.get('off');
//door.blockoff('enable');
