-- 1. Table joins with at least 3 tables in join
SELECT vin, make, model, saddress || ' ' || CAddress || ' ' || ZipCode AS "Office address"
FROM ZJY_OFFICE NATURAL JOIN ZJY_VEHICLE NATURAL JOIN ZJY_VELTYPE
ORDER BY vin;
-- list the detail of the vehicles and the office they belongs to

-- 2. Multi-row subquery 
SELECT typeName, vin, make, model, year
FROM ZJY_VELTYPE JOIN 
(
    SELECT typeID, vin, make, model, year
    FROM ZJY_VEHICLE a
    WHERE year >= ALL
    (
        SELECT year
        FROM ZJY_VEHICLE b
        WHERE a.typeID = b.typeID
    )
    ORDER BY typeID
) USING (typeID)
ORDER BY TYPEID;
-- list the vehicle in each type that has the newest year

-- 3. Correlated subquery
SELECT typeName, 
(
    SELECT count(*)
    FROM ZJY_VEHICLE b
    WHERE a.typeID = b.typeId
) as cnt
FROM ZJY_VELTYPE a
ORDER BY cnt;
-- list the number of vehicles of all type

-- 4. SET operator query 
SELECT vin, cid, pickdate, discount
FROM ZJY_VEH_CUST NATURAL JOIN ZJY_COUPON
UNION
SELECT vin, cid, pickdate, discount
FROM ZJY_VEH_CUST NATURAL JOIN ZJY_CUSTOMER NATURAL JOIN ZJY_CORPORATE_CUSTOMER NATURAL JOIN ZJY_CORPORATE
WHERE discount IS NOT NULL
ORDER BY pickdate;
-- list all the orders that uses a discount, either from a coupon or being a corporate customer with discount

-- 5. Query with in line view or WITH clause
WITH maxType AS 
(
    SELECT typeID, typeName, RentalRate
    FROM ZJY_VELTYPE
    WHERE RentalRate = 
    (
        SELECT max(RentalRate)
        FROM ZJY_VELTYPE
    )
)
SELECT typeName, RentalRate, vin, make, model, year
FROM ZJY_VEHICLE JOIN maxType USING (typeID);
-- List the vehicle with the type of the highest rental rate

-- 6. TOP-N query
SELECT *
FROM 
(
    SELECT vin, cid, pickdate, discount, rank() over (order by discount DESC) AS myrank
    FROM
    (
        SELECT vin, cid, pickdate, discount
        FROM ZJY_VEH_CUST NATURAL JOIN ZJY_COUPON
        UNION
        SELECT vin, cid, pickdate, discount
        FROM ZJY_VEH_CUST NATURAL JOIN ZJY_CUSTOMER NATURAL JOIN ZJY_CORPORATE_CUSTOMER NATURAL JOIN ZJY_CORPORATE
        WHERE discount IS NOT NULL
        ORDER BY pickdate
    )
    ORDER BY discount DESC
)
WHERE myrank <= 2;
-- list the order which are the top 2 in discount rate

