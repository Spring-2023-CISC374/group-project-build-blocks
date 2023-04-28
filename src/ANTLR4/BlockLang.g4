grammar BlockLang;

program
    : statement+ EOF
    ;

statement
    : loopStatement
    | moveStatement
    | actionStatement
    ;

loopStatement
    : 'loop' NUMBER statement+ 'endloop'
    ;

moveStatement
    : 'up' 
    | 'down' 
    | 'left' 
    | 'right'
    ;

actionStatement
    : grabAction
    | releaseAction
    ;

grabAction
    : 'grab'
    | 'close'
    ;

releaseAction
    : 'release'
    | 'open'
    ;

NUMBER
    : [0-9]+
    ;

WHITESPACE
    : [ \t\r\n]+ -> skip
    ;
