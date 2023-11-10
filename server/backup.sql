--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AcademicYear; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AcademicYear" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."AcademicYear" OWNER TO postgres;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    id text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    role integer DEFAULT 9291 NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: AnswerChoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AnswerChoice" (
    id text NOT NULL,
    "questionId" text,
    choice text NOT NULL,
    "isCorrect" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."AnswerChoice" OWNER TO postgres;

--
-- Name: Auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Auth" (
    id text NOT NULL,
    "userId" text NOT NULL,
    staff_id text,
    student_id text,
    password text NOT NULL
);


ALTER TABLE public."Auth" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Class; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Class" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Class" OWNER TO postgres;

--
-- Name: Guardian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Guardian" (
    id text NOT NULL,
    primary_contact text NOT NULL,
    secondary_contact text,
    date_created timestamp(3) without time zone NOT NULL,
    "studentId" text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    middlename text,
    occupation text NOT NULL
);


ALTER TABLE public."Guardian" OWNER TO postgres;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    question text NOT NULL,
    "topicId" text
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- Name: Results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Results" (
    id text NOT NULL,
    result integer NOT NULL,
    "categoryId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "studentId" text NOT NULL
);


ALTER TABLE public."Results" OWNER TO postgres;

--
-- Name: Sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sessions" (
    id text NOT NULL,
    "userId" text NOT NULL,
    ip inet NOT NULL,
    valid boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Sessions" OWNER TO postgres;

--
-- Name: Staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Staff" (
    id text NOT NULL,
    firstname text NOT NULL,
    middlename text,
    lastname text NOT NULL,
    email text NOT NULL,
    primary_contact text NOT NULL,
    secondary_contact text,
    dob timestamp(3) without time zone NOT NULL,
    residence text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    date_registered timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    role integer DEFAULT 3921 NOT NULL,
    staff_id text NOT NULL
);


ALTER TABLE public."Staff" OWNER TO postgres;

--
-- Name: StaffSubject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StaffSubject" (
    id text NOT NULL,
    name text NOT NULL,
    code text,
    "academicYearId" text,
    "termId" text
);


ALTER TABLE public."StaffSubject" OWNER TO postgres;

--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    student_id text NOT NULL,
    firstname text NOT NULL,
    middlename text,
    lastname text NOT NULL,
    dob timestamp(3) without time zone NOT NULL,
    residence text NOT NULL,
    "classId" text NOT NULL,
    date_registered timestamp(3) without time zone,
    id text NOT NULL,
    role integer DEFAULT 6631 NOT NULL
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: Term; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Term" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Term" OWNER TO postgres;

--
-- Name: Topic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Topic" (
    id text NOT NULL,
    "staffId" text,
    "classId" text NOT NULL,
    title text NOT NULL,
    "timeLimit" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "categoryId" text NOT NULL,
    deadline timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Topic" OWNER TO postgres;

--
-- Name: _ClassToStaffSubject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ClassToStaffSubject" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ClassToStaffSubject" OWNER TO postgres;

--
-- Name: _StaffClasses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_StaffClasses" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_StaffClasses" OWNER TO postgres;

--
-- Name: _StaffToStaffSubject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_StaffToStaffSubject" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_StaffToStaffSubject" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: AcademicYear; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AcademicYear" (id, name) FROM stdin;
\.


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (id, password, username, role) FROM stdin;
c052a448-36ab-4130-b09a-3e73e9c5974b	$2b$10$p/1XK9fGp3zz8ZnPoDRnIOuZU8jsJKSADaAmiTWkTHnq2PpBHWqau	admin	9291
\.


--
-- Data for Name: AnswerChoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AnswerChoice" (id, "questionId", choice, "isCorrect") FROM stdin;
3a9b17da-6fd6-4f5e-875a-eec75f5cf3f4	ff003283-4855-4322-82d5-c1fe3b36391e	Akuffo Addo	t
7a02e54f-0c3b-4cfb-8914-da262b0bda13	ff003283-4855-4322-82d5-c1fe3b36391e	John Mahama	f
5100a76f-06d2-424f-947a-b720371b2aaa	ff003283-4855-4322-82d5-c1fe3b36391e	Kuffuor	f
49324a82-0b9b-42da-b393-86a6f9ab4ae5	ff003283-4855-4322-82d5-c1fe3b36391e	Rawlings	f
093ebb41-c330-4b3f-ae0d-67a1df8c42b4	6f8539f5-aad6-4d1a-9f18-29e400bab746	Afforestation	f
6b63a591-b500-4969-b672-9f13b1f2fa74	6f8539f5-aad6-4d1a-9f18-29e400bab746	Deforestation	t
287fbfdc-78b3-45ca-9384-f2f2ca22af81	6f8539f5-aad6-4d1a-9f18-29e400bab746	Bush burning	f
7977d6c4-aeac-4a54-be6b-f28c140bb5cf	6f8539f5-aad6-4d1a-9f18-29e400bab746	Farm destruction	f
80ca611d-e70d-4ffd-9496-8fd55ee9e3dc	5605c134-b176-49c3-aa81-08993dae46f9	True	t
88b090d4-6b05-4c5b-a226-b1ce7e31ddce	5605c134-b176-49c3-aa81-08993dae46f9	False	f
2c2b0fd3-30f5-404d-bbff-17181bfb3e2b	5605c134-b176-49c3-aa81-08993dae46f9		f
6c0782a2-e0ab-46dc-bdeb-58a13449f5b2	5605c134-b176-49c3-aa81-08993dae46f9		f
74382b60-6819-49a0-8fa0-a38580dadbc9	4b010feb-80db-41c8-8a4e-cb5a374ac74f	North Asia	f
2720a9af-ac75-4e70-8918-55b99a713e57	4b010feb-80db-41c8-8a4e-cb5a374ac74f	South Africa	f
46d0f77f-ea85-4e20-bc2b-980af1498cf2	4b010feb-80db-41c8-8a4e-cb5a374ac74f	West Africa	t
b1824e6f-1280-4e4d-bc7a-1eb87a586067	4b010feb-80db-41c8-8a4e-cb5a374ac74f	None of the above	f
50eac929-09a7-4758-bd7a-a0633bb7b8c6	c02af072-387c-403c-8333-27b23bed5042	 London	f
68a56aaf-aac1-4c4f-946c-c94da62e4910	c02af072-387c-403c-8333-27b23bed5042	Berlin	f
198392e5-c7c7-40bd-81af-a6c9a95ca30a	c02af072-387c-403c-8333-27b23bed5042	Madrid	f
07c5ea7b-24b4-4a25-a8f3-f4a54d5d92d0	c02af072-387c-403c-8333-27b23bed5042	Paris	t
c4521c8a-9257-4f34-a455-d568ecf40f35	2616eb74-8ba4-4315-b90a-ccea2e551ee8	Nile	t
6e864d65-c0c6-49a4-835f-0e1256ead611	2616eb74-8ba4-4315-b90a-ccea2e551ee8	Amazon	f
bf201877-3a0b-4d3e-aa4a-3088b8afa0e4	2616eb74-8ba4-4315-b90a-ccea2e551ee8	Mississippi	f
e8c71cae-6528-4879-bbf8-07f9223a5a45	2616eb74-8ba4-4315-b90a-ccea2e551ee8	Yangtze	f
8f548668-a69f-4994-aa85-c236e28ef176	b34d52b0-6d58-4bac-a3de-2ae9b2de5e9d	Karl Marx	t
96250a65-e9c8-4a22-a6f1-894660392230	b34d52b0-6d58-4bac-a3de-2ae9b2de5e9d	Vladimir Lenin	f
31370ee9-4a4c-4395-a8da-bd88ef6b28dc	b34d52b0-6d58-4bac-a3de-2ae9b2de5e9d	Joseph Stalin	f
ca654fb3-efca-44e6-a9e5-1f00831821a9	b34d52b0-6d58-4bac-a3de-2ae9b2de5e9d	Friedrich Engels	f
f6c95d05-98f0-45a1-bddd-407191e75cdd	43055053-1474-4cd4-b208-cbc26f9060e8	1812	f
a2fc14cb-88b9-4f49-a549-b3aa826b7da2	43055053-1474-4cd4-b208-cbc26f9060e8	1776	f
b7130471-7217-44c5-964a-fc5514c32b97	43055053-1474-4cd4-b208-cbc26f9060e8	1492	t
5e625105-1412-4194-8ab1-c8adab8d599b	43055053-1474-4cd4-b208-cbc26f9060e8	1620	f
db45e471-2345-4ae0-908d-db1764851eee	8a0bbb65-4076-4350-9bcd-11fbc86a2c2b	Earth	f
a6d8353c-e624-442b-a2a7-6fc3aa94ff4e	8a0bbb65-4076-4350-9bcd-11fbc86a2c2b	Venus	f
57ac4237-ce38-4740-9a7b-3a70e1b4070d	8a0bbb65-4076-4350-9bcd-11fbc86a2c2b	Jupiter	t
b4390d98-bc88-4b67-aef0-aa6dddf314a7	8a0bbb65-4076-4350-9bcd-11fbc86a2c2b	Saturn	f
83ece77c-5c75-4f15-9c82-bb52e71c7692	88230248-f0b8-4320-aea7-6cdbc102afc4	 Jawaharlal Nehru	f
fa358920-64d9-4360-ab36-765e95aa3139	88230248-f0b8-4320-aea7-6cdbc102afc4	Subhas Chandra Bose	f
ed995900-a14c-4302-a41a-1d34ed90e4fe	88230248-f0b8-4320-aea7-6cdbc102afc4	Mahatma Gandhi	t
0e93e6ac-4219-41be-82d9-f12b77375215	88230248-f0b8-4320-aea7-6cdbc102afc4	Sardar Vallabhbhai Patel	f
\.


--
-- Data for Name: Auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Auth" (id, "userId", staff_id, student_id, password) FROM stdin;
a4e5fbf2-859b-4ab6-9cb1-86740caa12d6	1000	\N	1c656af6-3eaa-4bd0-9908-0c34f8ef3b0c	$2b$10$kxeURsiWt2qHUsGqf89T5.wZ8BoPVWR75krohAarFG3GKGt2LhOwK
c005c12d-aa81-450a-b2aa-8bd937069754	STA1000	3f166176-8ec9-45b7-873b-40fff529900b	\N	$2b$10$p/bHIglVLFuqNyn1nJAUkOue8rGyG2pAEfjloZ0lrhE5Bung.Pbcy
a1002350-70c9-4f71-9d91-c21ff28c5849	STA1001	9a7847c7-2d84-401d-8551-79e2225de360	\N	$2b$10$q5ik13UjkjpmeD2vtGNibuWxXrxsK49uvtUPg.cp3OG0f13hMFr/S
f04653b8-7713-4509-8f18-926160245f71	STA1002	7e7a1b57-fe16-4901-bda0-70369d43fde4	\N	$2b$10$asBDGDLCTvrnnAvej1maAe07d/w5es2Eoir/oBjDEUQ70W4V4Lpja
b0c6017e-d00c-4519-9f3b-1e94905e4236	1001	\N	73e4dc8c-549e-495c-9122-4cafc3221a02	$2b$10$tLMCfVoHHwm05NnGdxm/9u8227zZ62l4PiIjmgtKIhSLKJDFIg49K
8e345bf3-783e-4056-9bd3-70cdc2c85fba	1002	\N	5f7be12b-29a1-43cb-af69-281b72c4c2b6	$2b$10$KCECI0ekqaHrDDolib3LyeS1otFRV3nKSTUpiUdjojhXEuaF8lw2C
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name) FROM stdin;
d0d286dd-a221-4881-8cd4-d905179f3973	exam
dc519019-c204-4e12-9a25-1df6b5604cf9	quiz
\.


--
-- Data for Name: Class; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Class" (id, name) FROM stdin;
5bd07b7c-3025-45e3-bdb2-9ee4d37fbd38	Creché
6116bb15-c89d-42ec-8f7e-c1568356004a	KG 1
7537957d-831a-4f7c-be05-aa1aface62d6	KG 2
4887a7dc-fc6c-416d-ab70-40f97fea0d53	Primary 1
451c027e-bbbb-448b-9bcc-e4af1a4ffeda	Primary 2
d8ef06d7-6cbe-412f-a645-63b8a02d4e32	Primary 3
67e635bb-f9fe-42ad-bfbe-dc540b16bc3e	Primary 4
20b8cff0-a47d-4c94-bca5-1104472aaddd	Primary 5
45844984-9fb2-41ef-b64a-efd88ebbda9e	Primary 6
69b698c5-4c1f-4d08-8d73-6184142ed120	JHS 1
2f4d9c58-1917-409b-80c5-40f3933d2478	JHS 2
12704a78-3ccc-4cec-90cc-b3cb074c3895	JHS 3
\.


--
-- Data for Name: Guardian; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Guardian" (id, primary_contact, secondary_contact, date_created, "studentId", firstname, lastname, middlename, occupation) FROM stdin;
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, "createdAt", "updatedAt", question, "topicId") FROM stdin;
ff003283-4855-4322-82d5-c1fe3b36391e	2023-11-02 12:01:21.993	2023-11-02 12:01:21.993	Who is the president of the 4th republic of Ghana?	39619b5c-6184-4eea-8808-fe664274c107
6f8539f5-aad6-4d1a-9f18-29e400bab746	2023-11-02 12:01:22.003	2023-11-02 12:01:22.003	Destruction of farmlands is termed as...	39619b5c-6184-4eea-8808-fe664274c107
5605c134-b176-49c3-aa81-08993dae46f9	2023-11-02 12:01:22.008	2023-11-02 12:01:22.008	Culture is the way of life of people	39619b5c-6184-4eea-8808-fe664274c107
4b010feb-80db-41c8-8a4e-cb5a374ac74f	2023-11-02 12:01:22.014	2023-11-02 12:01:22.014	Which part of Africa is Ghana located?	39619b5c-6184-4eea-8808-fe664274c107
c02af072-387c-403c-8333-27b23bed5042	2023-11-02 12:01:22.02	2023-11-02 12:01:22.02	What is the capital of France?	39619b5c-6184-4eea-8808-fe664274c107
2616eb74-8ba4-4315-b90a-ccea2e551ee8	2023-11-02 12:01:22.025	2023-11-02 12:01:22.025	Which river is the longest in the world?	39619b5c-6184-4eea-8808-fe664274c107
b34d52b0-6d58-4bac-a3de-2ae9b2de5e9d	2023-11-02 12:01:22.029	2023-11-02 12:01:22.029	Who wrote "The Communist Manifesto"?\n	39619b5c-6184-4eea-8808-fe664274c107
43055053-1474-4cd4-b208-cbc26f9060e8	2023-11-02 12:01:22.033	2023-11-02 12:01:22.033	In which year did Christopher Columbus reach the Americas?\n	39619b5c-6184-4eea-8808-fe664274c107
8a0bbb65-4076-4350-9bcd-11fbc86a2c2b	2023-11-02 12:01:22.036	2023-11-02 12:01:22.036	What is the largest planet in our solar system?\n\n	39619b5c-6184-4eea-8808-fe664274c107
88230248-f0b8-4320-aea7-6cdbc102afc4	2023-11-02 12:01:22.04	2023-11-02 12:01:22.04	Who is known as the "Father of the Nation" in India?\n	39619b5c-6184-4eea-8808-fe664274c107
\.


--
-- Data for Name: Results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Results" (id, result, "categoryId", "createdAt", "updatedAt", "studentId") FROM stdin;
\.


--
-- Data for Name: Sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sessions" (id, "userId", ip, valid) FROM stdin;
3e083092-1c8d-4fb6-b91f-0733427df0ab	c052a448-36ab-4130-b09a-3e73e9c5974b	127.0.0.1	t
1d6a7841-1856-495a-8caf-424a67e81907	STA1000	127.0.0.1	t
662f2a9d-d822-4d26-a300-fde2e648da97	3a377b6b-595f-4e3b-af5e-08e09b90cf90	127.0.0.1	t
5e85774d-3389-49fe-bfd7-cac59d5616c2	STA1002	127.0.0.1	t
65cfb3ae-150d-4920-9912-318c51406b2d	1c656af6-3eaa-4bd0-9908-0c34f8ef3b0c	127.0.0.1	t
e603547d-c52b-4bdd-8912-6fc69d20b7fd	STA1001	127.0.0.1	t
ae1fb6de-9bf0-4840-b632-cd5bea33b8be	5f7be12b-29a1-43cb-af69-281b72c4c2b6	127.0.0.1	t
\.


--
-- Data for Name: Staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Staff" (id, firstname, middlename, lastname, email, primary_contact, secondary_contact, dob, residence, is_admin, is_active, date_registered, role, staff_id) FROM stdin;
3f166176-8ec9-45b7-873b-40fff529900b	George	\N	Gucci	george@test.io	020030302	\N	1990-06-25 00:00:00	Mpraeso	f	t	2023-11-01 06:56:19.268	3921	STA1000
9a7847c7-2d84-401d-8551-79e2225de360	Emily	\N	Smith	emily@test.io	0207373003	\N	1990-06-25 00:00:00	Mpraeso	f	t	2023-11-01 06:58:01.218	3921	STA1001
7e7a1b57-fe16-4901-bda0-70369d43fde4	Philip	Gibson	Cudjoe	themaingib@gmail.com	0248429031		1994-07-07 00:00:00	Accra	f	t	2023-11-01 11:47:37.982	3921	STA1002
\.


--
-- Data for Name: StaffSubject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StaffSubject" (id, name, code, "academicYearId", "termId") FROM stdin;
4fbb22bf-1a0c-40c0-83c4-5d55a3183769	RME	\N	\N	\N
1f84d6c5-0ba3-4708-a85e-af538f84e346	English	\N	\N	\N
e64b659a-7e03-4bf8-a16e-8658bf36236c	BDT	\N	\N	\N
f8743f76-457d-4049-ad92-dd4151bf04d3	Integrated Science	\N	\N	\N
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" (student_id, firstname, middlename, lastname, dob, residence, "classId", date_registered, id, role) FROM stdin;
1000	Abdul	\N	Karim	2002-12-19 00:00:00	Kumasi	20b8cff0-a47d-4c94-bca5-1104472aaddd	\N	1c656af6-3eaa-4bd0-9908-0c34f8ef3b0c	6631
1001	John	Ohene	Sam	2000-12-15 00:00:00	Kumasi	69b698c5-4c1f-4d08-8d73-6184142ed120	\N	73e4dc8c-549e-495c-9122-4cafc3221a02	6631
1002	James		Brown	2023-11-09 00:00:00	Adenta	20b8cff0-a47d-4c94-bca5-1104472aaddd	\N	5f7be12b-29a1-43cb-af69-281b72c4c2b6	6631
\.


--
-- Data for Name: Term; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Term" (id, name) FROM stdin;
\.


--
-- Data for Name: Topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Topic" (id, "staffId", "classId", title, "timeLimit", "createdAt", "updatedAt", "categoryId", deadline) FROM stdin;
39619b5c-6184-4eea-8808-fe664274c107	\N	69b698c5-4c1f-4d08-8d73-6184142ed120	Social Studies	30	2023-11-02 12:01:21.977	2023-11-02 12:01:21.977	d0d286dd-a221-4881-8cd4-d905179f3973	2023-11-10 00:00:00
\.


--
-- Data for Name: _ClassToStaffSubject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ClassToStaffSubject" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _StaffClasses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_StaffClasses" ("A", "B") FROM stdin;
4887a7dc-fc6c-416d-ab70-40f97fea0d53	3f166176-8ec9-45b7-873b-40fff529900b
451c027e-bbbb-448b-9bcc-e4af1a4ffeda	3f166176-8ec9-45b7-873b-40fff529900b
69b698c5-4c1f-4d08-8d73-6184142ed120	9a7847c7-2d84-401d-8551-79e2225de360
2f4d9c58-1917-409b-80c5-40f3933d2478	9a7847c7-2d84-401d-8551-79e2225de360
12704a78-3ccc-4cec-90cc-b3cb074c3895	9a7847c7-2d84-401d-8551-79e2225de360
69b698c5-4c1f-4d08-8d73-6184142ed120	7e7a1b57-fe16-4901-bda0-70369d43fde4
2f4d9c58-1917-409b-80c5-40f3933d2478	7e7a1b57-fe16-4901-bda0-70369d43fde4
12704a78-3ccc-4cec-90cc-b3cb074c3895	7e7a1b57-fe16-4901-bda0-70369d43fde4
20b8cff0-a47d-4c94-bca5-1104472aaddd	7e7a1b57-fe16-4901-bda0-70369d43fde4
\.


--
-- Data for Name: _StaffToStaffSubject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_StaffToStaffSubject" ("A", "B") FROM stdin;
7e7a1b57-fe16-4901-bda0-70369d43fde4	1f84d6c5-0ba3-4708-a85e-af538f84e346
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7207da2d-de0a-4be6-b028-542680a6ebf6	0ee395a49b580588de4c85d4c75e26d631a18e586d5ca8f35f0c5fff290c58eb	2023-10-21 23:37:26.42112+00	20231019211124_question_bank	\N	\N	2023-10-21 23:37:26.41602+00	1
de31b600-b492-4657-8b53-ad4bf6cb3779	11ed563bed9f5ddb66e3c76b185de9307a14635d124d31625776ddc0fd3e20fb	2023-10-21 23:37:25.586814+00	20230928160402_first	\N	\N	2023-10-21 23:37:25.287952+00	1
2d72cb13-11a2-435e-b0bc-bff8ea985c33	033b26d60d8aa078daad7abf6e6562466bd60b0400c743f0326b290a28febe07	2023-10-21 23:37:25.592625+00	20230929134457_second	\N	\N	2023-10-21 23:37:25.588112+00	1
95a9379d-fcc8-4b8e-a81d-9907afebca52	1f252e18857bad5e35bdb47349d3e549b3c449d8260af57c5055ed150af45e8a	2023-10-21 23:37:25.620716+00	20230929140157_third	\N	\N	2023-10-21 23:37:25.59382+00	1
0bcc02d8-730c-4718-bba3-2b7c806d5877	24236f6d08fc749affc1b7d737849f424fbe7e035b34cc9639856960fcdfed45	2023-10-21 23:37:26.427522+00	20231019214243_question_bank	\N	\N	2023-10-21 23:37:26.422464+00	1
7212c935-1993-4305-a724-aeecd6f8021f	630fe76faa7815b914f731af44fda0d628af7ef9e2bc5905ba59eb40498afc90	2023-10-21 23:37:25.663362+00	20231009181625_third	\N	\N	2023-10-21 23:37:25.62212+00	1
cb007096-cf00-401e-a410-4b64619b6f96	18fd8d9d4530b64da87191a1ba3b0036f01575aa81661e609111ee3e7e0ff634	2023-10-21 23:37:25.724472+00	20231018215307_question_bank	\N	\N	2023-10-21 23:37:25.664526+00	1
5cd38df9-ff78-42ec-9c3f-b465ec671b2b	acd0bf9570b9b996643ac70d6a05094425c826a4cbaaaaa7cd3c599f864705ba	2023-10-31 17:40:40.389849+00	20231031174040_questionbank	\N	\N	2023-10-31 17:40:40.321774+00	1
e5aba460-9b51-4533-a494-3bc979b8d098	5de2871c60b503db2877a7aec85ef9ad9e47de45a24f12650777b316d6f3a5fb	2023-10-21 23:37:26.279009+00	20231018222334_question_bank	\N	\N	2023-10-21 23:37:25.72604+00	1
a5b578fe-2587-4fe0-a83f-2dc50a562be8	bb4f608a034cdb4229bea5dd770eb24d1e6dcbd56b68a185daa0eb48c1356730	2023-10-21 23:37:26.471625+00	20231021180259_question_bank	\N	\N	2023-10-21 23:37:26.428962+00	1
078420f4-d062-4c67-a2c3-afa1a71ea6ef	349d6265cbfec90fbf907a19e4b1b4e699c52386550965af4c05044dace70a76	2023-10-21 23:37:26.374996+00	20231019200847_question_bank	\N	\N	2023-10-21 23:37:26.280284+00	1
ccdda1c8-eb08-4e8f-8eda-c61d832e75c9	6eb39ffe3ad6876cbfaa1a5e56c9d1fff390b7546d9323f8311867ae7c531fff	2023-10-21 23:37:26.382253+00	20231019202040_question_bank	\N	\N	2023-10-21 23:37:26.376249+00	1
50c662ce-444f-42cd-9b12-6daa5c588aa9	be33a3b7f5110477a088c15e943605872650f524a377bad0696fbc0b1237c9cf	2023-10-21 23:37:26.387525+00	20231019202215_question_bank	\N	\N	2023-10-21 23:37:26.383682+00	1
0b9cc25b-aec0-4775-809c-db1ba11b38d7	1c4da3b3d259b18de9daef11a13b01217c7e960e2b0ef2a71be1dea59a88e585	2023-10-21 23:37:26.479265+00	20231021180629_question_bank	\N	\N	2023-10-21 23:37:26.47281+00	1
5bd47b11-6e40-4e78-a996-0aabf9ec82e8	e396b6198ab260837f96b1a18734602904870c116f97ca4d61f821c44936e041	2023-10-21 23:37:26.392805+00	20231019202403_question_bank	\N	\N	2023-10-21 23:37:26.388864+00	1
99bdab95-7607-4cbe-94e9-97e59e08da0c	e4c95bf4e5f8442dce0006f44d5c8e0270c6f3834cf7864a23584ae0f27b65ee	2023-10-21 23:37:26.399426+00	20231019202734_question_bank	\N	\N	2023-10-21 23:37:26.393971+00	1
ebdba668-a83e-4dab-8fc9-2e2b6e774a96	10a913172472cddeb9f5d22b5545aed5052a6fb1f112875b95e6706326397ce2	2023-10-21 23:37:26.405377+00	20231019205352_question_bank	\N	\N	2023-10-21 23:37:26.4008+00	1
7ee5fdb2-7852-425e-a343-8e76d72d4db0	966f884715beae08148c9ce16041a7e17b3e81fa50198750f60b77ac467fa150	2023-10-21 23:37:26.659984+00	20231021200755_question_bank	\N	\N	2023-10-21 23:37:26.480569+00	1
2dde40b5-6545-461f-82e3-66162527b355	d58e5e8c0768a2606083af14480293796c0f3e4758b480dd037d9ba0c4d88f6c	2023-10-21 23:37:26.414545+00	20231019210337_question_bank	\N	\N	2023-10-21 23:37:26.40649+00	1
4ee95457-22c4-412b-8b18-4f5c6bbb1111	985ceee99c0adbe478c598fbcb9c05868cacd7c302eacaa2f28c19d19e93044d	2023-10-31 21:07:27.48955+00	20231031210727_questionbank	\N	\N	2023-10-31 21:07:27.46285+00	1
0606e782-194a-4d4e-881a-5c1b5fdba00e	9582b8533b6999be7644225933ca692f71e85063f4c6da3df4fc293a359dc477	2023-10-27 07:00:22.766563+00	20231027063638_question_bank	\N	\N	2023-10-27 07:00:22.71074+00	1
b5430edc-00f6-43c2-8001-2c6143051bb2	300d1de024b90e48f230de54244c5e80954175e64504a1e10fed8fd2e2a4af4a	2023-10-27 16:06:08.71835+00	20231027160608_student_model_change	\N	\N	2023-10-27 16:06:08.707976+00	1
7b0ed8c1-116d-49c7-a84b-bbf8da8acebf	9ad7ec0600cfc9e56d9e04ba9ac459326aa66edf7ab9d5c8db42aa7e0ef13d8d	2023-11-08 15:21:05.326834+00	20231108152105_questionbank	\N	\N	2023-11-08 15:21:05.313424+00	1
f0d3e0f9-557d-46ee-addc-e60348e2a4f3	328bf77eca7b21c62223c46ecd58e94445cb5b5e300d6a1c3a34ef61b9cd5fcb	2023-10-27 17:38:15.013292+00	20231027173814_	\N	\N	2023-10-27 17:38:14.995683+00	1
bfd520a2-231b-4b31-978b-33c27f315730	9c35ab9cd406810329525e9d8a25d7e11ef795ddba0a6a6b3a1ed3d0a09d0652	2023-10-31 11:36:41.290049+00	20231031113641_questionbank	\N	\N	2023-10-31 11:36:41.238194+00	1
94dc389b-721e-4559-8cba-35c4d41c72fc	5beb279282e9623eafabef40cad4ee09a4d9c2d491723c6c161ac0153f6135e6	\N	20231109071623_questionbank	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20231109071623_questionbank\n\nDatabase error code: 23502\n\nDatabase error:\nERROR: column "title" of relation "Results" contains null values\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23502), message: "column \\"title\\" of relation \\"Results\\" contains null values", detail: None, hint: None, position: None, where_: None, schema: Some("public"), table: Some("Results"), column: Some("title"), datatype: None, constraint: None, file: Some("tablecmds.c"), line: Some(6051), routine: Some("ATRewriteTable") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20231109071623_questionbank"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20231109071623_questionbank"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:201	\N	2023-11-09 07:16:53.734031+00	0
\.


--
-- Name: AcademicYear AcademicYear_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AcademicYear"
    ADD CONSTRAINT "AcademicYear_pkey" PRIMARY KEY (id);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: AnswerChoice AnswerChoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnswerChoice"
    ADD CONSTRAINT "AnswerChoice_pkey" PRIMARY KEY (id);


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Class Class_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_pkey" PRIMARY KEY (id);


--
-- Name: Guardian Guardian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guardian"
    ADD CONSTRAINT "Guardian_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Results Results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Results"
    ADD CONSTRAINT "Results_pkey" PRIMARY KEY (id);


--
-- Name: Sessions Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (id);


--
-- Name: StaffSubject StaffSubject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StaffSubject"
    ADD CONSTRAINT "StaffSubject_pkey" PRIMARY KEY (id);


--
-- Name: Staff Staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Staff"
    ADD CONSTRAINT "Staff_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: Term Term_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Term"
    ADD CONSTRAINT "Term_pkey" PRIMARY KEY (id);


--
-- Name: Topic Topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Auth_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Auth_id_key" ON public."Auth" USING btree (id);


--
-- Name: Auth_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Auth_userId_key" ON public."Auth" USING btree ("userId");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Class_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Class_name_key" ON public."Class" USING btree (name);


--
-- Name: StaffSubject_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StaffSubject_name_key" ON public."StaffSubject" USING btree (name);


--
-- Name: Staff_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Staff_email_key" ON public."Staff" USING btree (email);


--
-- Name: Staff_primary_contact_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Staff_primary_contact_key" ON public."Staff" USING btree (primary_contact);


--
-- Name: Staff_staff_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Staff_staff_id_key" ON public."Staff" USING btree (staff_id);


--
-- Name: Student_student_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_student_id_key" ON public."Student" USING btree (student_id);


--
-- Name: _ClassToStaffSubject_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ClassToStaffSubject_AB_unique" ON public."_ClassToStaffSubject" USING btree ("A", "B");


--
-- Name: _ClassToStaffSubject_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ClassToStaffSubject_B_index" ON public."_ClassToStaffSubject" USING btree ("B");


--
-- Name: _StaffClasses_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_StaffClasses_AB_unique" ON public."_StaffClasses" USING btree ("A", "B");


--
-- Name: _StaffClasses_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_StaffClasses_B_index" ON public."_StaffClasses" USING btree ("B");


--
-- Name: _StaffToStaffSubject_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_StaffToStaffSubject_AB_unique" ON public."_StaffToStaffSubject" USING btree ("A", "B");


--
-- Name: _StaffToStaffSubject_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_StaffToStaffSubject_B_index" ON public."_StaffToStaffSubject" USING btree ("B");


--
-- Name: staff_auth_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX staff_auth_fk ON public."Staff" USING btree (staff_id, id);


--
-- Name: staff_auth_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX staff_auth_pk ON public."Auth" USING btree (staff_id, "userId");


--
-- Name: student_auth_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX student_auth_fk ON public."Student" USING btree (id, student_id);


--
-- Name: student_auth_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX student_auth_pk ON public."Auth" USING btree (student_id, "userId");


--
-- Name: AnswerChoice AnswerChoice_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnswerChoice"
    ADD CONSTRAINT "AnswerChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Guardian Guardian_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guardian"
    ADD CONSTRAINT "Guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Results Results_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Results"
    ADD CONSTRAINT "Results_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Results Results_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Results"
    ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StaffSubject StaffSubject_academicYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StaffSubject"
    ADD CONSTRAINT "StaffSubject_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES public."AcademicYear"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: StaffSubject StaffSubject_termId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StaffSubject"
    ADD CONSTRAINT "StaffSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES public."Term"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Student Student_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Topic Topic_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Topic Topic_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Topic Topic_staffId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES public."Staff"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassToStaffSubject _ClassToStaffSubject_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ClassToStaffSubject"
    ADD CONSTRAINT "_ClassToStaffSubject_A_fkey" FOREIGN KEY ("A") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassToStaffSubject _ClassToStaffSubject_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ClassToStaffSubject"
    ADD CONSTRAINT "_ClassToStaffSubject_B_fkey" FOREIGN KEY ("B") REFERENCES public."StaffSubject"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _StaffClasses _StaffClasses_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_StaffClasses"
    ADD CONSTRAINT "_StaffClasses_A_fkey" FOREIGN KEY ("A") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _StaffClasses _StaffClasses_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_StaffClasses"
    ADD CONSTRAINT "_StaffClasses_B_fkey" FOREIGN KEY ("B") REFERENCES public."Staff"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _StaffToStaffSubject _StaffToStaffSubject_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_StaffToStaffSubject"
    ADD CONSTRAINT "_StaffToStaffSubject_A_fkey" FOREIGN KEY ("A") REFERENCES public."Staff"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _StaffToStaffSubject _StaffToStaffSubject_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_StaffToStaffSubject"
    ADD CONSTRAINT "_StaffToStaffSubject_B_fkey" FOREIGN KEY ("B") REFERENCES public."StaffSubject"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Auth staff_auth_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT staff_auth_fk FOREIGN KEY (staff_id, "userId") REFERENCES public."Staff"(id, staff_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Auth student_auth_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT student_auth_fk FOREIGN KEY (student_id, "userId") REFERENCES public."Student"(id, student_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

