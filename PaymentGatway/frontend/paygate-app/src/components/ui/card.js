// ./components/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => {
    return <div className={`p-4 rounded shadow-md ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const CardDescription = ({ children }) => {
    return <p className="text-sm text-gray-600">{children}</p>;
};

export const CardContent = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const CardFooter = ({ children }) => {
    return <div>{children}</div>;
};
