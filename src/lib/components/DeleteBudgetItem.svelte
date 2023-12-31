<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import type { BudgetItem } from "@prisma/client";
    import { Button } from "./ui/button";
    export let budgetItem: BudgetItem;
    export let action: string;
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost">-</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
                This action cannot be undone. This will permanently remove <span
                    class="font-bold">{budgetItem.title}</span
                > from your budget.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <form method="POST" {action}>
                <input
                    type="hidden"
                    name="budgetItemId"
                    value={budgetItem.id}
                />
                <AlertDialog.Action type="submit">Confirm</AlertDialog.Action>
            </form>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
