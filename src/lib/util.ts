export const zip = <A,B> (left: Array<A>, right: Array<B>): Array<[A, B]> => {
    return left.map((lv, i) => [lv, right[i]])
}