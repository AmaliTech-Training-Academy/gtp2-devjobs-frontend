#!/bin/bash

echo "🧹 DevJobs Frontend - Complete Cleanup Script"
echo "⚠️  This will DELETE ALL AWS resources created by Copilot"
echo ""

read -p "Are you sure you want to proceed? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cleanup cancelled"
    exit 0
fi

echo ""
echo "🗑️  Starting cleanup process..."

# Step 1: Delete Services
echo "1️⃣  Deleting services..."
copilot svc delete --name frontend --env staging --yes 2>/dev/null || echo "   ⚠️  Service already deleted or doesn't exist"
copilot svc delete --name frontend --env production --yes 2>/dev/null || echo "   ⚠️  Production service doesn't exist"

# Step 2: Delete Environments
echo "2️⃣  Deleting environments..."
copilot env delete --name staging --yes 2>/dev/null || echo "   ⚠️  Staging environment already deleted"
copilot env delete --name production --yes 2>/dev/null || echo "   ⚠️  Production environment doesn't exist"

# Step 3: Delete Application
echo "3️⃣  Deleting application..."
copilot app delete devjobs --yes 2>/dev/null || echo "   ⚠️  Application already deleted"

# Step 4: Verify cleanup
echo "4️⃣  Verifying cleanup..."
remaining_apps=$(copilot app ls 2>/dev/null | grep -v "No applications found" | wc -l)

if [ "$remaining_apps" -eq 0 ]; then
    echo "✅ Cleanup completed successfully!"
    echo "💰 All AWS resources have been deleted - billing should stop"
else
    echo "⚠️  Some applications may still exist:"
    copilot app ls
fi

echo ""
echo "📋 Manual verification steps:"
echo "   1. Check AWS ECS Console - no services should be running"
echo "   2. Check AWS EC2 Console - no load balancers should exist"
echo "   3. Check AWS CloudFormation - no 'devjobs-' stacks should exist"
echo "   4. Monitor AWS billing for cost reduction"