'use client';

import { SESSION_TOKEN } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NavbarInterface {
    labels?: boolean;
}

export default function Navbar({ labels = true }: NavbarInterface) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const userRef = useOutsideClick(() => setOpen(false));

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            const { status } = await response.json();

            if (status === 'success') {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <nav className="flex w-full items-center justify-between border-b border-gray-300 p-8 sm:px-52">
                <div className="flex items-center gap-12">
                    <Link href={'/'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            className="h-8 fill-rose-500"
                        >
                            <path d="M23,19V17A11.01,11.01,0,0,0,13,6.051V4.723a2,2,0,1,0-2,0V6.051A11.01,11.01,0,0,0,1,17v2a1,1,0,0,0,0,2H23A1,1,0,0,0,23,19ZM3,17C3.473,5.066,20.531,5.075,21,17v2H3Z" />
                        </svg>
                    </Link>
                    <ul className="flex gap-8">
                        <li className="hidden lg:block">
                            <Link
                                href={'/'}
                                className="text-gray-500 hover:text-rose-500"
                            >
                                Meal plans
                            </Link>
                        </li>
                        <li className="hidden lg:block">
                            <Link
                                href={'/recipes'}
                                className="text-gray-500 hover:text-rose-500"
                            >
                                Recipes
                            </Link>
                        </li>
                        <li className="hidden lg:block">
                            <Link
                                href={'/my-recipes'}
                                className="text-gray-500 hover:text-rose-500"
                            >
                                My recipes
                            </Link>
                        </li>
                        <li className="hidden lg:block">
                            <Link
                                href={'/ingredients'}
                                className="text-gray-500 hover:text-rose-500"
                            >
                                Ingredients
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        title="Search"
                        className="rounded-lg border border-gray-200 bg-white fill-gray-600 p-3 hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            className="h-4"
                        >
                            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
                        </svg>
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setOpen((open) => !open)}
                            type="button"
                            title="User"
                            className="rounded-lg border border-gray-200 bg-white fill-gray-600 p-3 hover:bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                className="h-4"
                            >
                                <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" />
                                <path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" />
                            </svg>
                        </button>
                        {open && (
                            <div
                                ref={userRef}
                                className="absolute right-0 top-[calc(100%+.5rem)] flex min-w-48 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 text-gray-600 shadow-xl"
                            >
                                <ul>
                                    <li className="w-full">
                                        <Link
                                            href={'/account'}
                                            className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-xl px-4 py-2 hover:bg-gray-200"
                                        >
                                            <div className="flex h-5 w-5 min-w-5 items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-5 min-h-5 w-5 min-w-5 stroke-gray-600"
                                                >
                                                    <path
                                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span className="w-full">
                                                Account
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href={'/recipes'}
                                            className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-xl px-4 py-2 hover:bg-gray-200"
                                        >
                                            <div className="flex h-5 w-5 min-w-5 items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    id="Layer_1"
                                                    data-name="Layer 1"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 min-h-4 w-4 min-w-4 fill-gray-600"
                                                >
                                                    <path d="M23,19V17A11.01,11.01,0,0,0,13,6.051V4.723a2,2,0,1,0-2,0V6.051A11.01,11.01,0,0,0,1,17v2a1,1,0,0,0,0,2H23A1,1,0,0,0,23,19ZM3,17C3.473,5.066,20.531,5.075,21,17v2H3Z"></path>
                                                </svg>
                                            </div>
                                            <span className="w-full">
                                                Recipes
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href={'/settings'}
                                            className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-xl px-4 py-2 hover:bg-gray-200"
                                        >
                                            <div className="flex h-5 w-5 min-w-5 items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    id="Outline"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 min-h-4 w-4 min-w-4 fill-gray-600"
                                                >
                                                    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                                    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z" />
                                                </svg>
                                            </div>
                                            <span className="w-full">
                                                Settings
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <div
                                            onClick={logout}
                                            className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-xl px-4 py-2 hover:bg-gray-200"
                                        >
                                            <div className="flex h-5 w-5 min-w-5 items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 min-h-4 w-4 min-w-4 fill-gray-600"
                                                >
                                                    <path d="M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z" />
                                                    <path d="M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z" />
                                                </svg>
                                            </div>
                                            <span className="w-full">
                                                Logout
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div
                className={`${
                    labels ? 'flex' : 'hidden'
                } justify-between border-b border-gray-300 px-8 sm:px-52`}
            >
                <div className="flex w-full items-center justify-between">
                    <ul className="flex">
                        <li
                            className="cursor-pointer border-b border-rose-500 px-4 py-2 text-rose-500"
                            title="All"
                        >
                            All
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Specials"
                        >
                            Specials
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Lunch"
                        >
                            Lunch
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Dinner"
                        >
                            Dinner
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Snacks"
                        >
                            Snacks
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Breakfasts"
                        >
                            Breakfasts
                        </li>
                        <li
                            className="hidden cursor-pointer border-b border-white px-4 py-2 text-gray-500 hover:border-rose-500 hover:text-rose-500 2xl:block"
                            title="Drinks"
                        >
                            Drinks
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden h-1/2 w-[1px] bg-gray-300 lg:block" />
                    <button
                        type="button"
                        className="hidden items-center gap-2 fill-gray-500 px-2 py-1 text-sm text-gray-500 hover:fill-gray-400 hover:text-gray-400 lg:flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            viewBox="0 0 24 24"
                            className="h-5"
                        >
                            <path d="m22.942 6.837-2.182-2.183.947-.947a1 1 0 1 0 -1.414-1.414l-.947.947-2.183-2.182a3.7 3.7 0 0 0 -5.105 0 3.609 3.609 0 0 0 0 5.106l2.182 2.182-5.894 5.894-2.183-2.182a3.7 3.7 0 0 0 -5.105 0 3.609 3.609 0 0 0 0 5.106l2.182 2.182-.947.947a1 1 0 1 0 1.414 1.414l.947-.947 2.183 2.182a3.609 3.609 0 0 0 5.105 0 3.608 3.608 0 0 0 0-5.105l-2.182-2.182 5.9-5.895 2.182 2.182a3.609 3.609 0 0 0 5.105 0 3.608 3.608 0 0 0 0-5.105zm-11.942 13.553a1.6 1.6 0 0 1 -.472 1.138 1.647 1.647 0 0 1 -2.277 0l-5.779-5.779a1.61 1.61 0 1 1 2.277-2.277l5.779 5.779a1.6 1.6 0 0 1 .472 1.139zm10.528-9.862a1.647 1.647 0 0 1 -2.277 0l-5.779-5.779a1.61 1.61 0 1 1 2.277-2.277l5.779 5.779a1.609 1.609 0 0 1 0 2.277z" />
                        </svg>
                        Dietary
                    </button>
                    <button
                        type="button"
                        className="hidden items-center gap-2 fill-gray-500 px-2 py-1 text-sm text-gray-500 hover:fill-gray-400 hover:text-gray-400 lg:flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            className="h-5"
                        >
                            <path d="M13,0h-2c-2.206,0-4,1.794-4,4V20c0,2.206,1.794,4,4,4h2c2.206,0,4-1.794,4-4V4c0-2.206-1.794-4-4-4Zm0,22h-2c-1.103,0-2-.897-2-2V4c0-1.103,.897-2,2-2h2c1.103,0,2,.897,2,2v1h-2c-.553,0-1,.447-1,1s.447,1,1,1h2v2h-2c-.553,0-1,.447-1,1s.447,1,1,1h2v2h-2c-.553,0-1,.447-1,1s.447,1,1,1h2v2h-2c-.553,0-1,.447-1,1s.447,1,1,1h2v1c0,1.103-.897,2-2,2Z" />
                        </svg>
                        Calories
                    </button>
                    <div className="hidden gap-1 text-sm lg:flex">
                        <span className="whitespace-nowrap text-gray-500">
                            Sort by:
                        </span>
                        <button className="flex cursor-pointer gap-1 fill-gray-800 text-gray-800 hover:fill-gray-600 hover:text-gray-600">
                            <span className="font-semibold">Recommended</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                className="h-5"
                            >
                                <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            title="List"
                            className="stroke-gray-600 hover:stroke-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                data-slot="icon"
                                className="h-5 stroke-inherit"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            title="Cards"
                            className="stroke-gray-600 hover:stroke-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                data-slot="icon"
                                className="h-5 stroke-inherit"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
