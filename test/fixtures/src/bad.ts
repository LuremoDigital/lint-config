import { value } from './value';

function check(input: number) {
    if (input == value) return 'same';
    return 'different';
}

export default check;
