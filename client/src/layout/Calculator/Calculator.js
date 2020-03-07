import React from 'react';
import io from 'socket.io-client';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';
import Log from './Screen/Log';

const socket = io('http://localhost:3000');

class Calculator extends React.Component {
    state = {
        equation: '',
        result: 0,
        log:[],
        expression: '',
        finishedEval: false
    }
    componentDidMount(){
        socket.on('evaluation', logData => {
            this.setState({
                log: logData
            })
        });
        socket.emit('evaluation', null);
    }
    onButtonPress = event => {
        if (this.state.finishedEval) this.clear();

        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;
        
        if (pressedButton === 'C') {
            this.clear();
            return;
        }
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') equation += pressedButton;
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) equation += ' ' + pressedButton + ' ';
        else if (pressedButton === '=') {
            try {
                const evalResult = eval(equation);
                const result = Number.isInteger(evalResult)? evalResult : evalResult.toFixed(2);
                this.setState({
                    result: result,
                    finishedEval: true,
                    expression: equation + ' = ' + result
                }, () => socket.emit('evaluation', this.state.expression));
            } catch (error) {
                alert('Invalid Mathematical Equation');
            }
        }
        else {
            equation = equation.trim();
            equation = equation.substr(0, equation.length - 1);
        }
                
        this.setState({equation: equation});
    }
    clear() {
        this.setState({
            equation: '', 
            result: 0, 
            expression: '',
            finishedEval: false
        });
    }

    render() {
        return (
            <main className="calculator">
                <Screen equation={this.state.equation} result={this.state.result} />
                <Keypad onButtonPress={this.onButtonPress} />
                <Log data = {this.state.log} />
            </main>
        );
    }
}

export default Calculator;

